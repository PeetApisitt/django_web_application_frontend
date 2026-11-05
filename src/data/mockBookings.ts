import { BookingRequest, EmployeeBookingReservation } from '../types';

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 101,
    requesting_division_id: 2, // J108 กองโครงการและงบประมาณ
    source_division_id: 1, // J101 กองกลาง
    requested_by_id: 3,
    requested_by_name: 'น.อ. ธนากร  มีสุข',
    purpose: 'ขอสนับสนุนกำลังพลร่วมดำเนินการจัดเตรียมแผนงบประมาณประจำปี และประสานงานเอกสารราชการเร่งด่วน',
    booking_date: '2026-11-10',
    end_date: '2026-11-12',
    status: 'pending_review',
    created_at: '2026-11-04T08:30:00Z',
    updated_at: '2026-11-04T08:35:00Z',
    items: [
      {
        id: 1001,
        booking_request_id: 101,
        employee_code: 'J1004',
        employee_name_snapshot: 'พ.อ.หญิง รัชนีวรรณ  สว่างวงษ์',
        status: 'pending_review',
        reviewed_by_id: null,
        reviewed_by_name: null,
        reviewed_at: null,
        review_note: '',
        created_at: '2026-11-04T08:30:00Z'
      },
      {
        id: 1002,
        booking_request_id: 101,
        employee_code: 'J1005',
        employee_name_snapshot: 'พ.อ. สมเกียรติ  วัฒนศิริ',
        status: 'pending_review',
        reviewed_by_id: null,
        reviewed_by_name: null,
        reviewed_at: null,
        review_note: '',
        created_at: '2026-11-04T08:30:00Z'
      }
    ]
  },
  {
    id: 102,
    requesting_division_id: 1, // J101 กองกลาง
    source_division_id: 1, // J101 กองกลาง (จองภายใน)
    requested_by_id: 1,
    requested_by_name: 'พล.อ.ท. จักรพันธ์  อจลพงศ์',
    purpose: 'จัดสรรกำลังพลปฏิบัติภารกิจพิเศษตรวจเยี่ยมหน่วยงานส่วนหน้า',
    booking_date: '2026-11-08',
    end_date: '2026-11-09',
    status: 'approved',
    approved_by_id: 1,
    approved_by_name: 'พล.อ.ท. จักรพันธ์  อจลพงศ์',
    approved_at: '2026-11-03T10:00:00Z',
    created_at: '2026-11-03T09:45:00Z',
    updated_at: '2026-11-03T10:00:00Z',
    items: [
      {
        id: 1003,
        booking_request_id: 102,
        employee_code: 'J1006',
        employee_name_snapshot: 'พ.ท. อนุชา  ทองคำ',
        status: 'approved',
        reviewed_by_id: 1,
        reviewed_by_name: 'พล.อ.ท. จักรพันธ์  อจลพงศ์',
        reviewed_at: '2026-11-03T10:00:00Z',
        review_note: 'จองใช้ภายในแผนก (อนุมัติอัตโนมัติ)',
        created_at: '2026-11-03T09:45:00Z'
      }
    ]
  },
  {
    id: 103,
    requesting_division_id: 2, // J108 กองโครงการและงบประมาณ
    source_division_id: 10, // J109 กองเทคโนโลยีดิจิทัล
    requested_by_id: 3,
    requested_by_name: 'น.อ. ธนากร  มีสุข',
    purpose: 'ยืมตัวผู้เชี่ยวชาญระบบสารสนเทศเพื่อวิเคราะห์ระบบรายงานสารสนเทศทางการเงิน',
    booking_date: '2026-11-15',
    end_date: '2026-11-16',
    status: 'partially_approved',
    approved_by_id: 4,
    approved_by_name: 'พ.อ. วรพงษ์  พงษ์ภักดี',
    approved_at: '2026-11-04T11:00:00Z',
    created_at: '2026-11-04T09:00:00Z',
    updated_at: '2026-11-04T11:00:00Z',
    items: [
      {
        id: 1004,
        booking_request_id: 103,
        employee_code: 'J1019',
        employee_name_snapshot: 'พ.อ. วรพงษ์  พงษ์ภักดี',
        status: 'rejected',
        reviewed_by_id: 4,
        reviewed_by_name: 'พ.อ. วรพงษ์  พงษ์ภักดี',
        reviewed_at: '2026-11-04T11:00:00Z',
        review_note: 'ติดภารกิจประชุมความมั่นคงทางไซเบอร์ ไม่สามารถสละเวลาได้',
        created_at: '2026-11-04T09:00:00Z'
      },
      {
        id: 1005,
        booking_request_id: 103,
        employee_code: 'J1020',
        employee_name_snapshot: 'พ.ท. วีระศักดิ์  ชัยพฤกษ์',
        status: 'approved',
        reviewed_by_id: 4,
        reviewed_by_name: 'พ.อ. วรพงษ์  พงษ์ภักดี',
        reviewed_at: '2026-11-04T11:00:00Z',
        review_note: 'อนุมัติให้ไปช่วยงานตามกำหนดเวลา',
        created_at: '2026-11-04T09:00:00Z'
      }
    ]
  },
  {
    id: 104,
    requesting_division_id: 2, // J108
    source_division_id: 1, // J101
    requested_by_id: 3,
    requested_by_name: 'น.อ. ธนากร  มีสุข',
    purpose: 'ร่างคำขอเบื้องต้นสำหรับจัดสัมมนาร่วมปลายเดือน',
    booking_date: '2026-11-25',
    end_date: '2026-11-26',
    status: 'draft',
    created_at: '2026-11-04T14:00:00Z',
    updated_at: '2026-11-04T14:00:00Z',
    items: [
      {
        id: 1006,
        booking_request_id: 104,
        employee_code: 'J1007',
        employee_name_snapshot: 'ร.อ. ชนินทร์  แก้ววิเชียร',
        status: 'draft',
        reviewed_by_id: null,
        reviewed_by_name: null,
        reviewed_at: null,
        review_note: '',
        created_at: '2026-11-04T14:00:00Z'
      }
    ]
  }
];

export const INITIAL_RESERVATIONS: EmployeeBookingReservation[] = [
  // For request 101: 2026-11-10 to 2026-11-12
  { id: 1, booking_request_item_id: 1001, booking_request_id: 101, employee_code: 'J1004', booking_date: '2026-11-10', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },
  { id: 2, booking_request_item_id: 1001, booking_request_id: 101, employee_code: 'J1004', booking_date: '2026-11-11', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },
  { id: 3, booking_request_item_id: 1001, booking_request_id: 101, employee_code: 'J1004', booking_date: '2026-11-12', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },
  { id: 4, booking_request_item_id: 1002, booking_request_id: 101, employee_code: 'J1005', booking_date: '2026-11-10', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },
  { id: 5, booking_request_item_id: 1002, booking_request_id: 101, employee_code: 'J1005', booking_date: '2026-11-11', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },
  { id: 6, booking_request_item_id: 1002, booking_request_id: 101, employee_code: 'J1005', booking_date: '2026-11-12', mission_note: 'งานงบประมาณ', created_at: '2026-11-04T08:35:00Z' },

  // For request 102: 2026-11-08 to 2026-11-09
  { id: 7, booking_request_item_id: 1003, booking_request_id: 102, employee_code: 'J1006', booking_date: '2026-11-08', mission_note: 'ตรวจราชการ', created_at: '2026-11-03T10:00:00Z' },
  { id: 8, booking_request_item_id: 1003, booking_request_id: 102, employee_code: 'J1006', booking_date: '2026-11-09', mission_note: 'ตรวจราชการ', created_at: '2026-11-03T10:00:00Z' },

  // For request 103 (item 1005 only)
  { id: 9, booking_request_item_id: 1005, booking_request_id: 103, employee_code: 'J1020', booking_date: '2026-11-15', mission_note: 'ว.กพ', created_at: '2026-11-04T11:00:00Z' },
  { id: 10, booking_request_item_id: 1005, booking_request_id: 103, employee_code: 'J1020', booking_date: '2026-11-16', mission_note: 'ว.กพ', created_at: '2026-11-04T11:00:00Z' },
];
