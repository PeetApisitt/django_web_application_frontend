export interface Division {
  id: number;
  code: string;
  name: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type DivisionRole = 'division_admin' | 'division_director' | 'division_user' | 'superuser';

export interface DivisionRoleAssignment {
  id: number;
  user_id: number;
  division_id: number;
  role: DivisionRole;
  is_active: boolean;
  created_at?: string;
}

export interface Employee {
  id: number;
  employee_code: string;
  full_name: string;
  position: string;
  email: string;
  division_code: string;
  division_name: string;
  division_id: number;
}

export interface User {
  id: number;
  username: string;
  employee_code: string;
  first_name: string;
  position: string;
  email: string;
  is_superuser: boolean;
  division_id: number;
  division_code: string;
  role: DivisionRole;
  role_label: string;
}

export type BookingRequestStatus =
  | 'draft'
  | 'pending_review'
  | 'pending_signature'
  | 'approved'
  | 'partially_approved'
  | 'rejected'
  | 'cancelled';

export type BookingItemStatus =
  | 'draft'
  | 'pending_review'
  | 'accepted'
  | 'rejected'
  | 'approved'
  | 'cancelled';

export interface BookingRequestItem {
  id: number;
  booking_request_id: number;
  employee_code: string;
  employee_name_snapshot: string;
  status: BookingItemStatus;
  reviewed_by_id?: number | null;
  reviewed_by_name?: string | null;
  reviewed_at?: string | null;
  review_note?: string;
  created_at: string;
}

export interface BookingRequest {
  id: number;
  requesting_division_id: number;
  source_division_id: number;
  requested_by_id: number;
  requested_by_name?: string;
  purpose: string;
  booking_date: string; // YYYY-MM-DD
  end_date?: string | null; // YYYY-MM-DD
  status: BookingRequestStatus;
  approved_by_id?: number | null;
  approved_by_name?: string | null;
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  items: BookingRequestItem[];
}

export interface EmployeeBookingReservation {
  id: number;
  booking_request_item_id?: number | null;
  booking_request_id?: number | null;
  employee_code: string;
  booking_date: string; // YYYY-MM-DD
  created_at: string;
  mission_note?: string; // ชื่อภารกิจ เช่น "งานงบประมาณ", "ว.กพ"
  is_direct_admin_booking?: boolean;
}

export interface CreateBookingRequestInput {
  requesting_division_id: number;
  source_division_id: number;
  purpose: string;
  booking_date: string;
  end_date?: string | null;
  items: {
    employee_code: string;
    employee_name_snapshot: string;
  }[];
}
