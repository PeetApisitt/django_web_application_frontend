import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DivisionRosterCalendar } from './DivisionRosterCalendar';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface AvailabilityCalendarProps {
  onSelectBooking: (bookingId: number) => void;
  onOpenCreateWithDivision?: (divisionId: number) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  onSelectBooking,
  onOpenCreateWithDivision
}) => {
  const {
    reservations,
    employees,
    divisions,
    bookings,
    getEmployeeByCode
  } = useApp();

  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('all');
  const [searchEmployeeQuery, setSearchEmployeeQuery] = useState<string>('');
  const [checkDate, setCheckDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  // Filtered reservations list
  const filteredReservations = useMemo(() => {
    return reservations
      .map(res => {
        const emp = getEmployeeByCode(res.employee_code);
        const booking = bookings.find(b => b.id === res.booking_request_id);
        return {
          ...res,
          employee: emp,
          booking
        };
      })
      .filter(item => {
        if (selectedDivisionId !== 'all') {
          if (item.employee?.division_id !== Number(selectedDivisionId)) {
            return false;
          }
        }
        if (searchEmployeeQuery.trim()) {
          const q = searchEmployeeQuery.toLowerCase().trim();
          const matchCode = item.employee_code.toLowerCase().includes(q);
          const matchName = (item.employee?.full_name || '').toLowerCase().includes(q);
          const matchDate = item.booking_date.includes(q);
          const matchMission = (item.mission_note || '').toLowerCase().includes(q);
          if (!matchCode && !matchName && !matchDate && !matchMission) return false;
        }
        return true;
      })
      .sort((a, b) => a.booking_date.localeCompare(b.booking_date));
  }, [reservations, employees, selectedDivisionId, searchEmployeeQuery, getEmployeeByCode, bookings]);

  // Group reservations by date
  const groupedByDate = useMemo(() => {
    const map = new Map<string, typeof filteredReservations>();
    filteredReservations.forEach(r => {
      const arr = map.get(r.booking_date) || [];
      arr.push(r);
      map.set(r.booking_date, arr);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredReservations]);

  return (
    <div className="space-y-8">
      {/* 
        Requirement 2: เพิ่มปฏิทินสรุปยอดภาพรวมสถานภาพกำลังพลแต่ละกองงาน
        ในหน้า "ปฏิทินความพร้อมกำลังพล" ไว้บนสุดของหน้า พร้อมกับ select box สำหรับเลือกกองงาน
      */}
      <section aria-label="ปฏิทินสรุปยอดภาพรวมสถานภาพกำลังพลแต่ละกองงาน">
        <DivisionRosterCalendar
          onOpenCreateWithDivision={onOpenCreateWithDivision}
          onSelectBooking={onSelectBooking}
        />
      </section>

      {/* Section 2: Daily Verification Simulator & Detailed Date Records */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              บันทึกรายการกันสิทธิ์และการจองรายวัน (Detailed Daily Reservation Records)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ตรวจสอบประวัติการจอง วันที่กำลังพลติดภารกิจ และเลขคำขอที่อ้างอิงเพื่อป้องกันการจองซ้อน
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">ยอดกันสิทธิ์สะสมทั้งหมด:</span>
            <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              {reservations.length} รายการ
            </span>
          </div>
        </div>

        {/* Filter and Simulator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Quick Availability Checker */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-4 lg:col-span-1 space-y-3">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              เครื่องมือตรวจสอบความพร้อมรายวัน
            </h4>
            <p className="text-[11px] text-indigo-700 leading-relaxed">
              เลือกวันที่เพื่อตรวจสอบยอดกำลังพลที่ว่างและติดภารกิจในวันดังกล่าว
            </p>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                เลือกวันที่ต้องการตรวจสอบ:
              </label>
              <input
                type="date"
                value={checkDate}
                onChange={e => setCheckDate(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-indigo-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="text-xs pt-1 border-t border-indigo-200/80 space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>กำลังพลที่ถูกจองในวันนี้:</span>
                <span className="font-bold text-rose-700">
                  {reservations.filter(r => r.booking_date === checkDate).length} นาย
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>กำลังพลที่ว่างพร้อมปฏิบัติงาน:</span>
                <span className="font-bold text-emerald-700">
                  {employees.length - reservations.filter(r => r.booking_date === checkDate).length} นาย
                </span>
              </div>
            </div>
          </div>

          {/* Filter controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 lg:col-span-2 flex flex-col justify-between space-y-3">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-500" />
              ค้นหาและกรองรายการจอง
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  กรองตามกองงานต้นสังกัด:
                </label>
                <select
                  value={selectedDivisionId}
                  onChange={e => setSelectedDivisionId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">ทุกกองงาน (11 กองงาน)</option>
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.code} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  ค้นหากำลังพล หรือชื่อภารกิจ:
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="รหัส เช่น J1004, ชื่อ, หรือภารกิจ..."
                    value={searchEmployeeQuery}
                    onChange={e => setSearchEmployeeQuery(e.target.value)}
                    className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              * การกันสิทธิ์เกิดขึ้นอัตโนมัติเมื่อมีการส่งคำขอ หรือเมื่อแอดมินกองงานกดจอง toggle ในปฏิทินด้านบน
            </div>
          </div>
        </div>

        {/* Date-grouped reservations cards */}
        <div className="space-y-4">
          {groupedByDate.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-2">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h5 className="text-xs font-bold text-slate-700">ไม่พบรายการกันสิทธิ์ตามเงื่อนไข</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">
                กำลังพลทั้งหมดพร้อมให้บริการ หรือลองเปลี่ยนเงื่อนไขการค้นหา
              </p>
            </div>
          ) : (
            groupedByDate.map(([dateStr, items]) => (
              <div key={dateStr} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                {/* Date Header */}
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span className="text-xs font-bold text-slate-900">
                      วันที่ {new Date(dateStr).toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded">
                      {dateStr}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                    จองแล้ว {items.length} นาย
                  </span>
                </div>

                {/* Items for this date */}
                <div className="divide-y divide-slate-100">
                  {items.map(res => (
                    <div
                      key={res.id}
                      className="p-3 sm:p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-mono font-bold text-[11px]">
                          {res.employee_code}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              {res.employee ? res.employee.full_name : res.employee_code}
                            </span>
                            {res.employee?.position && (
                              <span className="text-slate-500 text-[11px]">
                                ({res.employee.position})
                              </span>
                            )}
                            {res.mission_note && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-200">
                                {res.mission_note}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>สังกัด: {res.employee?.division_name} ({res.employee?.division_code})</span>
                            <span>•</span>
                            <span>บันทึกเมื่อ: {new Date(res.created_at).toLocaleTimeString('th-TH')}</span>
                            {res.is_direct_admin_booking && (
                              <span className="text-emerald-700 font-medium bg-emerald-50 px-1 rounded">
                                จองโดยแอดมินกองงาน
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        {res.booking ? (
                          <div className="text-right">
                            <div className="text-[11px] text-slate-500">
                              อิงตามคำขอ #{res.booking.id}
                            </div>
                            <button
                              onClick={() => res.booking && onSelectBooking(res.booking.id)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>ดูคำขอ</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">จองตรงในกองงาน</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
