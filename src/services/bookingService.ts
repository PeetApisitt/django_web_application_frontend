import { apiClient } from './apiClient';
import {
  BookingRequest,
  BookingRequestItem,
  BookingRequestStatus,
  BookingItemStatus,
  CreateBookingPayload,
  CreateBookingItemPayload,
  ReviewAction,
  ReviewBookingItemPayload,
  User,
  DivisionRoleAssignment,
} from '../types';

export type {
  BookingRequest,
  BookingRequestItem,
  BookingRequestStatus,
  BookingItemStatus,
  CreateBookingPayload,
  CreateBookingItemPayload,
  ReviewAction,
  ReviewBookingItemPayload,
};

export interface BookingActionResponse {
  message?: string;
  status?: BookingRequestStatus | string;
  id?: number;
  booking?: BookingRequest;
  [key: string]: unknown;
}

/**
 * 1. ดึงรายการคำขอทั้งหมดที่ผู้ใช้มีสิทธิ์มองเห็น
 * GET /bookings/
 */
export const getBookings = async (): Promise<BookingRequest[]> => {
  const response = await apiClient.get<BookingRequest[]>('/bookings/');
  return response.data;
};

/**
 * ดึงรายละเอียดคำขอรายตัวตาม ID
 * GET /bookings/{request_id}/
 */
export const getBookingById = async (requestId: number): Promise<BookingRequest> => {
  const response = await apiClient.get<BookingRequest>(`/bookings/${requestId}/`);
  return response.data;
};

/**
 * 2. สร้างคำขอยืมพนักงานใหม่ (ตรงกับ CreateBookingIn ของ Backend)
 * POST /bookings/
 */
export const createBooking = async (
  payload: CreateBookingPayload
): Promise<BookingRequest> => {
  const response = await apiClient.post<BookingRequest>('/bookings/', payload);
  return response.data;
};

/**
 * ส่งคำขอแบบร่างเข้าสู่กระบวนการพิจารณา
 * POST /bookings/{request_id}/submit/
 */
export const submitBooking = async (
  requestId: number
): Promise<BookingActionResponse> => {
  const response = await apiClient.post<BookingActionResponse>(
    `/bookings/${requestId}/submit/`
  );
  return response.data;
};

/**
 * 3. พิจารณาคำขอรายบุคคล (Review)
 * POST /bookings/items/{item_id}/review/
 * Body: { action: 'ACCEPT' | 'REJECT', note: string }
 */
export async function reviewBookingItem(
  itemId: number,
  payload: ReviewBookingItemPayload
): Promise<BookingActionResponse>;
export async function reviewBookingItem(
  itemId: number,
  action: ReviewAction,
  note?: string
): Promise<BookingActionResponse>;
export async function reviewBookingItem(
  itemId: number,
  actionOrPayload: ReviewAction | ReviewBookingItemPayload,
  note: string = ''
): Promise<BookingActionResponse> {
  const body: ReviewBookingItemPayload =
    typeof actionOrPayload === 'string'
      ? { action: actionOrPayload, note }
      : actionOrPayload;

  const response = await apiClient.post<BookingActionResponse>(
    `/bookings/items/${itemId}/review/`,
    body
  );
  return response.data;
}

/**
 * 4. ยกเลิกคำขอ
 * DELETE /bookings/{request_id}/cancel/
 */
export const cancelBooking = async (
  requestId: number
): Promise<BookingActionResponse> => {
  const response = await apiClient.delete<BookingActionResponse>(
    `/bookings/${requestId}/cancel/`
  );
  return response.data;
};

// Aliases for backward compatibility across components/context
export const fetchBookings = getBookings;
export const createBookingRequest = createBooking;
export const submitBookingRequest = submitBooking;
export const cancelBookingRequest = cancelBooking;

export const bookingService = {
  getBookings,
  getBookingById,
  createBooking,
  submitBooking,
  reviewBookingItem,
  cancelBooking,
};

// UI Status Display & Helper Utilities
export const STATUS_LABELS: Record<
  string,
  { label: string; badgeClass: string; bgClass: string }
> = {
  draft: {
    label: 'แบบร่าง',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
    bgClass: 'bg-slate-50 text-slate-700',
  },
  pending_review: {
    label: 'รอแอดมินพิจารณา',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    bgClass: 'bg-amber-50 text-amber-700',
  },
  pending_signature: {
    label: 'รอหัวหน้าแผนกลงนาม',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    bgClass: 'bg-indigo-50 text-indigo-700',
  },
  approved: {
    label: 'อนุมัติครบตามคำขอ',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgClass: 'bg-emerald-50 text-emerald-700',
  },
  partially_approved: {
    label: 'อนุมัติบางรายชื่อ',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    bgClass: 'bg-blue-50 text-blue-700',
  },
  rejected: {
    label: 'ปฏิเสธคำขอ',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    bgClass: 'bg-rose-50 text-rose-700',
  },
  cancelled: {
    label: 'ยกเลิกคำขอ',
    badgeClass: 'bg-zinc-200 text-zinc-600 border-zinc-300',
    bgClass: 'bg-zinc-100 text-zinc-600',
  },
  accepted: {
    label: 'แอดมินยอมรับ',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
    bgClass: 'bg-teal-50 text-teal-700',
  },
};

export function getDatesBetween(
  startDateStr: string,
  endDateStr?: string | null
): string[] {
  const dates: string[] = [];
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : new Date(startDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return [startDateStr];
  }

  const current = new Date(start);
  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function canUserManageDivision(
  user: User | null,
  divisionId: number,
  roleAssignments: DivisionRoleAssignment[] = []
): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;
  if (
    user.division_id === divisionId &&
    (user.role === 'division_admin' || user.role === 'division_director')
  ) {
    return true;
  }
  return roleAssignments.some(
    ra =>
      ra.user_id === user.id &&
      ra.division_id === divisionId &&
      ra.is_active &&
      (ra.role === 'division_admin' || ra.role === 'division_director')
  );
}

export function canUserReviewDivision(
  user: User | null,
  divisionId: number,
  roleAssignments: DivisionRoleAssignment[] = []
): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;
  if (user.division_id === divisionId && user.role === 'division_admin') {
    return true;
  }
  return roleAssignments.some(
    ra =>
      ra.user_id === user.id &&
      ra.division_id === divisionId &&
      ra.is_active &&
      ra.role === 'division_admin'
  );
}

export function isBookingAccessible(
  booking: BookingRequest,
  user: User,
  roleAssignments: DivisionRoleAssignment[] = []
): boolean {
  if (user.is_superuser) return true;
  if (booking.requested_by_id === user.id) return true;
  return canUserManageDivision(user, booking.source_division_id, roleAssignments);
}

export default bookingService;
