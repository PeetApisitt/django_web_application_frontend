import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Send,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';

export const ApiDocsView: React.FC = () => {
  const { bookings, accessibleBookings, currentUser } = useApp();
  const [activeEndpoint, setActiveEndpoint] = useState<string>('list');
  const [selectedBookingId, setSelectedBookingId] = useState<number>(bookings[0]?.id || 101);
  const [testResult, setTestResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const endpoints = [
    {
      id: 'list',
      method: 'GET',
      path: '/api/bookings/',
      desc: 'ดึงรายการคำขอทั้งหมดที่ผู้ใช้มีสิทธิ์มองเห็น (get_accessible_booking_requests)',
      auth: 'Required (Django Auth / Session)',
      responseSchema: 'List[BookingRequestSchema]'
    },
    {
      id: 'detail',
      method: 'GET',
      path: '/api/bookings/{request_id}/',
      desc: 'ดูรายละเอียดคำขอรายตัว พร้อมรายการพนักงานที่ระบุ (can_view_booking_request)',
      auth: 'Required (Requester / Source Division Admin / Superuser)',
      responseSchema: 'BookingRequestSchema'
    },
    {
      id: 'create',
      method: 'POST',
      path: '/api/bookings/',
      desc: 'สร้างคำขอยืมพนักงานใหม่ บันทึกเป็นสถานะ DRAFT อัตโนมัติ',
      auth: 'Required',
      bodySchema: 'CreateBookingIn (requesting_division_id, source_division_id, purpose, booking_date, end_date, items)'
    },
    {
      id: 'submit',
      method: 'POST',
      path: '/api/bookings/{request_id}/submit/',
      desc: 'ส่งคำขอตรวจสอบสิทธิ์ ป้องกันการจองซ้ำ และสร้าง Reservation (อนุมัติอัตโนมัติหากจองภายในแผนก)',
      auth: 'Required (Requester)',
      responseSchema: '{ message: string, status: string }'
    },
    {
      id: 'review',
      method: 'POST',
      path: '/api/bookings/items/{item_id}/review/',
      desc: 'แอดมินกองงานต้นสังกัดพิจารณาพนักงานรายบุคคล (ACCEPT / REJECT พร้อมหมายเหตุ)',
      auth: 'Required (Division Admin)',
      bodySchema: 'ReviewActionSchema (action: ACCEPT | REJECT, note: string)'
    },
    {
      id: 'cancel',
      method: 'DELETE',
      path: '/api/bookings/{request_id}/cancel/',
      desc: 'ยกเลิกคำขอโดยผู้สร้าง และปลดสิทธิ์การจองในระบบทันที',
      auth: 'Required (Requester)',
      responseSchema: '{ message: string, status: string }'
    },
    {
      id: 'auth_me',
      method: 'GET',
      path: '/api/auth/me',
      desc: 'ดึงข้อมูลโปรไฟล์ผู้ใช้งานปัจจุบัน บทบาท สังกัดกองงาน และสิทธิ์ในระบบ',
      auth: 'Required (Session Auth)',
      responseSchema: '{ authenticated: boolean, user: UserProfileSchema }'
    }
  ];

  const handleTestApi = (endpointId: string) => {
    if (endpointId === 'auth_me') {
      setTestResult({
        status: 200,
        authenticated: !!currentUser,
        user: currentUser
          ? {
              id: currentUser.id,
              username: currentUser.username,
              employee_code: currentUser.employee_code,
              first_name: currentUser.first_name,
              position: currentUser.position,
              email: currentUser.email,
              is_superuser: currentUser.is_superuser,
              division: {
                id: currentUser.division_id,
                code: currentUser.division_code
              },
              role: currentUser.role,
              role_label: currentUser.role_label
            }
          : null
      });
    } else if (endpointId === 'list') {
      setTestResult(accessibleBookings);
    } else if (endpointId === 'detail') {
      const b = bookings.find(x => x.id === selectedBookingId) || bookings[0];
      setTestResult(b);
    } else if (endpointId === 'create') {
      setTestResult({
        sample_request_body: {
          requesting_division_id: 2,
          source_division_id: 1,
          purpose: 'ขอสนับสนุนกำลังพลร่วมดำเนินการจัดเตรียมแผนงบประมาณ',
          booking_date: '2026-11-20',
          end_date: '2026-11-22',
          items: [
            { employee_code: 'J1004', employee_name_snapshot: 'พ.อ.หญิง รัชนีวรรณ  สว่างวงษ์' }
          ]
        },
        sample_response: {
          status: 201,
          message: 'สร้างคำขอแบบร่างสำเร็จ (ID: 105)',
          booking_status: 'draft'
        }
      });
    } else if (endpointId === 'submit') {
      setTestResult({
        endpoint: `/api/bookings/${selectedBookingId}/submit/`,
        logic: 'Atomic transaction: Check draft status -> Validate dates -> Verify no duplicate employee_code -> Check EmployeeBookingReservation conflict -> If internal: auto approve -> Else: set pending_review'
      });
    } else if (endpointId === 'review') {
      setTestResult({
        payload_example: { action: 'ACCEPT', note: 'อนุมัติให้ไปช่วยงานตามกำหนดเวลา' },
        evaluation_rules: 'All accepted -> APPROVED; Mixed -> PARTIALLY_APPROVED; All rejected -> REJECTED (releases reservations)'
      });
    } else if (endpointId === 'cancel') {
      setTestResult({
        endpoint: `/api/bookings/${selectedBookingId}/cancel/`,
        rules: 'Must be requested_by or superuser. Releases all EmployeeBookingReservation rows.'
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0 font-mono font-bold">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Employee Booking API Reference
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-semibold">
                v1.0.0
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono font-semibold">
                Django Ninja / OpenAPI
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              โครงสร้าง API และ Schemas ที่พอร์ตมาจาก Django Ninja (`bookings/api.py` และ `bookings/services.py`)
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Active User: <strong>{currentUser ? currentUser.first_name : 'ผู้เยี่ยมชม (Guest)'}</strong></span>
        </div>
      </div>

      {/* Endpoints Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoints list */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            REST Endpoints
          </h3>
          {endpoints.map(ep => {
            const isSelected = activeEndpoint === ep.id;
            const methodColor =
              ep.method === 'GET'
                ? 'bg-blue-100 text-blue-800 border-blue-200'
                : ep.method === 'POST'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-rose-100 text-rose-800 border-rose-200';

            return (
              <div
                key={ep.id}
                onClick={() => {
                  setActiveEndpoint(ep.id);
                  handleTestApi(ep.id);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/10 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${methodColor}`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-800">
                    {ep.path}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{ep.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Live Explorer / Test Runner */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Response & Schema Inspector
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">ทดสอบกับคำขอ ID:</span>
                <select
                  value={selectedBookingId}
                  onChange={e => {
                    setSelectedBookingId(Number(e.target.value));
                    handleTestApi(activeEndpoint);
                  }}
                  className="text-xs p-1 rounded border border-slate-300 bg-slate-50"
                >
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>
                      #{b.id} ({b.status})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleTestApi(activeEndpoint)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  Execute
                </button>
              </div>
            </div>

            {/* Response Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-500">
                  Response Body (JSON)
                </span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(testResult || accessibleBookings, null, 2))}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? 'คัดลอกแล้ว!' : 'คัดลอก JSON'}
                </button>
              </div>

              <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
                {JSON.stringify(testResult || accessibleBookings, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
