import {
  BookingRequest,
  BookingRequestItem,
  EmployeeBookingReservation,
  CreateBookingRequestInput,
  User,
  DivisionRoleAssignment,
  Division
} from '../types';

export class BookingServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingServiceError';
  }
}

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}

// Generate date array from start to end (inclusive)
export function getDatesBetween(startDateStr: string, endDateStr?: string | null): string[] {
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

export const STATUS_LABELS: Record<string, { label: string; badgeClass: string; bgClass: string }> = {
  draft: {
    label: 'แบบร่าง',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
    bgClass: 'bg-slate-50 text-slate-700'
  },
  pending_review: {
    label: 'รอแอดมินพิจารณา',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    bgClass: 'bg-amber-50 text-amber-700'
  },
  pending_signature: {
    label: 'รอหัวหน้าแผนกลงนาม',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    bgClass: 'bg-indigo-50 text-indigo-700'
  },
  approved: {
    label: 'อนุมัติครบตามคำขอ',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgClass: 'bg-emerald-50 text-emerald-700'
  },
  partially_approved: {
    label: 'อนุมัติบางรายชื่อ',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    bgClass: 'bg-blue-50 text-blue-700'
  },
  rejected: {
    label: 'ปฏิเสธคำขอ',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    bgClass: 'bg-rose-50 text-rose-700'
  },
  cancelled: {
    label: 'ยกเลิกคำขอ',
    badgeClass: 'bg-zinc-200 text-zinc-600 border-zinc-300',
    bgClass: 'bg-zinc-100 text-zinc-600'
  },
  accepted: {
    label: 'แอดมินยอมรับ',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
    bgClass: 'bg-teal-50 text-teal-700'
  }
};

export function canUserManageDivision(
  user: User | null,
  divisionId: number,
  roleAssignments: DivisionRoleAssignment[]
): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;
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
  roleAssignments: DivisionRoleAssignment[]
): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;
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
  roleAssignments: DivisionRoleAssignment[]
): boolean {
  if (user.is_superuser) return true;
  if (booking.requested_by_id === user.id) return true;
  return canUserManageDivision(user, booking.source_division_id, roleAssignments);
}

export function createBookingRequest(
  payload: CreateBookingRequestInput,
  user: User,
  currentBookings: BookingRequest[]
): { newBooking: BookingRequest } {
  if (payload.end_date && payload.end_date < payload.booking_date) {
    throw new BookingServiceError('วันสิ้นสุดการใช้งานต้องไม่ก่อนวันเริ่มต้น');
  }

  if (!payload.items || payload.items.length === 0) {
    throw new BookingServiceError('กรุณาเพิ่มรายชื่อพนักงานก่อนสร้างคำขอ');
  }

  const nextBookingId = currentBookings.reduce((max, b) => Math.max(max, b.id), 0) + 1;
  const now = new Date().toISOString();

  let nextItemId = 1000 + nextBookingId * 10;

  const items: BookingRequestItem[] = payload.items.map(item => ({
    id: nextItemId++,
    booking_request_id: nextBookingId,
    employee_code: item.employee_code.trim(),
    employee_name_snapshot: item.employee_name_snapshot.trim(),
    status: 'draft',
    created_at: now
  }));

  const newBooking: BookingRequest = {
    id: nextBookingId,
    requesting_division_id: payload.requesting_division_id,
    source_division_id: payload.source_division_id,
    requested_by_id: user.id,
    requested_by_name: user.first_name,
    purpose: payload.purpose.trim(),
    booking_date: payload.booking_date,
    end_date: payload.end_date || null,
    status: 'draft',
    created_at: now,
    updated_at: now,
    items
  };

  return { newBooking };
}

export function submitBookingRequest(
  bookingId: number,
  user: User,
  bookings: BookingRequest[],
  reservations: EmployeeBookingReservation[]
): {
  updatedBookings: BookingRequest[];
  updatedReservations: EmployeeBookingReservation[];
  submittedBooking: BookingRequest;
} {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    throw new BookingServiceError('ไม่พบคำขอจองที่ระบุ');
  }

  if (booking.status !== 'draft') {
    throw new BookingServiceError('สามารถส่งคำขอได้เฉพาะรายการแบบร่าง');
  }

  if (!booking.booking_date) {
    throw new BookingServiceError('กรุณาระบุวันที่ต้องการใช้พนักงาน');
  }

  if (!booking.items || booking.items.length === 0) {
    throw new BookingServiceError('กรุณาเพิ่มรายชื่อพนักงานก่อนส่งคำขอ');
  }

  const codes = booking.items.map(i => i.employee_code.trim());
  if (codes.some(c => !c)) {
    throw new BookingServiceError('พบรายการที่ไม่ได้ระบุรหัสพนักงาน');
  }

  const uniqueCodes = new Set(codes);
  if (uniqueCodes.size !== codes.length) {
    throw new BookingServiceError('พบรหัสพนักงานซ้ำภายในคำขอเดียวกัน');
  }

  const bookingDates = getDatesBetween(booking.booking_date, booking.end_date);
  const newReservationsToAdd: EmployeeBookingReservation[] = [];
  let nextResId = reservations.reduce((max, r) => Math.max(max, r.id), 0) + 1;

  // Conflict checking against existing reservations
  for (const item of booking.items) {
    for (const bDate of bookingDates) {
      const existing = reservations.find(
        r => r.employee_code === item.employee_code && r.booking_date === bDate
      );
      if (existing && existing.booking_request_item_id !== item.id) {
        throw new BookingServiceError(
          `พนักงาน ${item.employee_code} (${item.employee_name_snapshot}) ถูกจองแล้วในวันที่ ${bDate}`
        );
      }

      newReservationsToAdd.push({
        id: nextResId++,
        booking_request_item_id: item.id,
        booking_request_id: booking.id,
        employee_code: item.employee_code,
        booking_date: bDate,
        mission_note: booking.purpose ? (booking.purpose.length > 25 ? booking.purpose.slice(0, 25) + '...' : booking.purpose) : 'ภารกิจยืมตัว',
        created_at: new Date().toISOString()
      });
    }
  }

  const isInternalBooking = booking.requesting_division_id === booking.source_division_id;
  const now = new Date().toISOString();

  const updatedItems: BookingRequestItem[] = booking.items.map(item => {
    if (isInternalBooking) {
      return {
        ...item,
        status: 'approved',
        reviewed_by_id: user.id,
        reviewed_by_name: user.first_name,
        reviewed_at: now,
        review_note: 'จองใช้ภายในแผนก (อนุมัติอัตโนมัติ)'
      };
    } else {
      return {
        ...item,
        status: 'pending_review',
        reviewed_by_id: null,
        reviewed_by_name: null,
        reviewed_at: null,
        review_note: ''
      };
    }
  });

  const updatedBooking: BookingRequest = {
    ...booking,
    status: isInternalBooking ? 'approved' : 'pending_review',
    items: updatedItems,
    approved_by_id: isInternalBooking ? user.id : null,
    approved_by_name: isInternalBooking ? user.first_name : null,
    approved_at: isInternalBooking ? now : null,
    updated_at: now
  };

  const updatedBookings = bookings.map(b => (b.id === booking.id ? updatedBooking : b));
  const updatedReservations = [...reservations, ...newReservationsToAdd];

  return {
    updatedBookings,
    updatedReservations,
    submittedBooking: updatedBooking
  };
}

export function reviewBookingItem(
  itemId: number,
  reviewer: User,
  action: 'ACCEPT' | 'REJECT',
  note: string,
  bookings: BookingRequest[],
  reservations: EmployeeBookingReservation[],
  roleAssignments: DivisionRoleAssignment[]
): {
  updatedBookings: BookingRequest[];
  updatedReservations: EmployeeBookingReservation[];
  reviewedItem: BookingRequestItem;
} {
  // Find booking containing this item
  const booking = bookings.find(b => b.items.some(i => i.id === itemId));
  if (!booking) {
    throw new BookingServiceError('ไม่พบคำขอที่มีรายการนี้');
  }

  const item = booking.items.find(i => i.id === itemId);
  if (!item) {
    throw new BookingServiceError('ไม่พบรายการพนักงานที่ต้องการพิจารณา');
  }

  if (item.status !== 'pending_review') {
    throw new BookingServiceError('ไม่สามารถพิจารณารายการนี้ได้ (สถานะปัจจุบันไม่ถูกต้อง)');
  }

  // Permission check: must be admin of source_division
  const isAdmin = canUserReviewDivision(reviewer, booking.source_division_id, roleAssignments);
  if (!isAdmin) {
    throw new PermissionError('คุณไม่มีสิทธิ์ในการพิจารณาคำขอของแผนกต้นสังกัดนี้ (ต้องมีสิทธิ์ Admin ของแผนกต้นสังกัด)');
  }

  if (action === 'REJECT' && (!note || !note.trim())) {
    throw new BookingServiceError('กรุณาระบุหมายเหตุเมื่อทำการปฏิเสธพนักงาน');
  }

  const now = new Date().toISOString();
  let updatedReservations = reservations;

  if (action === 'REJECT') {
    // Release reservations for this item
    updatedReservations = reservations.filter(r => r.booking_request_item_id !== itemId);
  }

  const updatedItem: BookingRequestItem = {
    ...item,
    status: action === 'ACCEPT' ? 'accepted' : 'rejected',
    reviewed_by_id: reviewer.id,
    reviewed_by_name: reviewer.first_name,
    reviewed_at: now,
    review_note: note.trim()
  };

  const updatedItems = booking.items.map(i => (i.id === itemId ? updatedItem : i));

  // Evaluate booking request overall status
  const hasPending = updatedItems.some(i => i.status === 'pending_review');
  let finalBookingStatus = booking.status;
  let finalItems = updatedItems;

  if (!hasPending) {
    const approvedCount = updatedItems.filter(i => i.status === 'accepted').length;
    const rejectedCount = updatedItems.filter(i => i.status === 'rejected').length;

    if (approvedCount > 0 && rejectedCount === 0) {
      finalBookingStatus = 'approved';
    } else if (approvedCount > 0 && rejectedCount > 0) {
      finalBookingStatus = 'partially_approved';
    } else {
      finalBookingStatus = 'rejected';
    }

    // Convert accepted items to approved
    if (approvedCount > 0) {
      finalItems = updatedItems.map(i => (i.status === 'accepted' ? { ...i, status: 'approved' } : i));
    }
  }

  const updatedBooking: BookingRequest = {
    ...booking,
    status: finalBookingStatus,
    items: finalItems,
    approved_by_id: finalBookingStatus === 'approved' || finalBookingStatus === 'partially_approved' ? reviewer.id : booking.approved_by_id,
    approved_by_name: finalBookingStatus === 'approved' || finalBookingStatus === 'partially_approved' ? reviewer.first_name : booking.approved_by_name,
    approved_at: finalBookingStatus === 'approved' || finalBookingStatus === 'partially_approved' ? now : booking.approved_at,
    updated_at: now
  };

  const updatedBookings = bookings.map(b => (b.id === booking.id ? updatedBooking : b));

  return {
    updatedBookings,
    updatedReservations,
    reviewedItem: updatedItem
  };
}

export function cancelBookingRequest(
  bookingId: number,
  currentUser: User,
  bookings: BookingRequest[],
  reservations: EmployeeBookingReservation[]
): {
  updatedBookings: BookingRequest[];
  updatedReservations: EmployeeBookingReservation[];
  cancelledBooking: BookingRequest;
} {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    throw new BookingServiceError('ไม่พบคำขอจองที่ระบุ');
  }

  if (booking.requested_by_id !== currentUser.id && !currentUser.is_superuser) {
    throw new PermissionError('คุณไม่มีสิทธิ์ยกเลิกคำขอนี้ (ต้องเป็นผู้สร้างคำขอเท่านั้น)');
  }

  if (booking.status === 'cancelled' || booking.status === 'rejected') {
    const statusLabel = STATUS_LABELS[booking.status]?.label || booking.status;
    throw new BookingServiceError(`ไม่สามารถยกเลิกคำขอที่อยู่ในสถานะ '${statusLabel}' ได้`);
  }

  const now = new Date().toISOString();
  const updatedItems: BookingRequestItem[] = booking.items.map(i => ({
    ...i,
    status: 'cancelled'
  }));

  const updatedBooking: BookingRequest = {
    ...booking,
    status: 'cancelled',
    items: updatedItems,
    updated_at: now
  };

  // Delete all reservations for this request
  const updatedReservations = reservations.filter(r => r.booking_request_id !== bookingId);
  const updatedBookings = bookings.map(b => (b.id === bookingId ? updatedBooking : b));

  return {
    updatedBookings,
    updatedReservations,
    cancelledBooking: updatedBooking
  };
}
