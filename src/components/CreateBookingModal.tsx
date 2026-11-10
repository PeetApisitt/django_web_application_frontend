import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CreateBookingRequestInput, Employee } from '../types';
import {
  X,
  Calendar,
  Building2,
  Users,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Send,
  Save,
  Clock,
  Sparkles
} from 'lucide-react';

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking?: (bookingId: number) => void;
}

export const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
  isOpen,
  onClose,
  onSelectBooking
}) => {
  const {
    currentUser,
    divisions,
    employees,
    createBooking,
    submitBooking,
    isEmployeeAvailable
  } = useApp();

  // Tomorrow as default start date
  const defaultStartDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [requestingDivId, setRequestingDivId] = useState<number>(currentUser?.division_id || 1);
  const [sourceDivId, setSourceDivId] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>('');
  const [selectedEmployees, setSelectedEmployees] = useState<{ employee_code: string; employee_name_snapshot: string; position?: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // All employees in source division
  const allDivisionEmployees = useMemo(() => {
    return employees.filter(e => e.division_id === sourceDivId);
  }, [employees, sourceDivId]);

  // Strict Requirement 3: Only show employees who are 100% available across the entire date range
  const sourceDivisionEmployees = useMemo(() => {
    if (!bookingDate) return allDivisionEmployees;
    return allDivisionEmployees.filter(e => {
      const check = isEmployeeAvailable(e.employee_code, bookingDate, endDate || null);
      return check.available;
    });
  }, [allDivisionEmployees, bookingDate, endDate, isEmployeeAvailable]);

  const unavailableCount = allDivisionEmployees.length - sourceDivisionEmployees.length;

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sourceDivisionEmployees;
    return sourceDivisionEmployees.filter(
      e =>
        e.full_name.toLowerCase().includes(q) ||
        e.employee_code.toLowerCase().includes(q) ||
        e.position.toLowerCase().includes(q)
    );
  }, [sourceDivisionEmployees, searchQuery]);

  const isInternalBooking = requestingDivId === sourceDivId;

  if (!isOpen) return null;

  const handleAddEmployee = (emp: Employee) => {
    if (selectedEmployees.some(item => item.employee_code === emp.employee_code)) {
      return;
    }

    // Availability check
    const check = isEmployeeAvailable(emp.employee_code, bookingDate, endDate || null);
    if (!check.available) {
      if (!window.confirm(`คำเตือน: กำลังพล ${emp.full_name} (${emp.employee_code}) ติดการจองแล้วในวันที่ ${check.conflictDate} หากส่งคำขอระบบจะปฏิเสธการจองซ้ำ คุณต้องการเพิ่มหรือไม่?`)) {
        return;
      }
    }

    setSelectedEmployees(prev => [
      ...prev,
      {
        employee_code: emp.employee_code,
        employee_name_snapshot: emp.full_name,
        position: emp.position
      }
    ]);
  };

  const handleRemoveEmployee = (code: string) => {
    setSelectedEmployees(prev => prev.filter(item => item.employee_code !== code));
  };

  const handleSubmit = async (shouldAutoSubmit: boolean) => {
    setError(null);

    if (!purpose.trim()) {
      setError('กรุณาระบุเหตุผลในการขอใช้พนักงาน');
      return;
    }

    if (!bookingDate) {
      setError('กรุณาระบุวันเริ่มต้นใช้งาน');
      return;
    }

    if (endDate && endDate < bookingDate) {
      setError('วันสิ้นสุดการใช้งานต้องไม่ก่อนวันเริ่มต้น');
      return;
    }

    if (selectedEmployees.length === 0) {
      setError('กรุณาเลือกพนักงานอย่างน้อย 1 นาย');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CreateBookingRequestInput = {
        requesting_division_id: requestingDivId,
        source_division_id: sourceDivId,
        purpose: purpose.trim(),
        booking_date: bookingDate,
        end_date: endDate || null,
        items: selectedEmployees.map(item => ({
          employee_code: item.employee_code,
          employee_name_snapshot: item.employee_name_snapshot
        }))
      };

      const newBooking = await createBooking(payload);

      if (shouldAutoSubmit && newBooking?.id) {
        await submitBooking(newBooking.id);
      }

      onClose();
      if (onSelectBooking && newBooking?.id) {
        onSelectBooking(newBooking.id);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการสร้างคำขอ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">สร้างคำขอยืมตัวกำลังพล</h3>
              <p className="text-xs text-slate-400">กรอกข้อมูลคำขอและเลือกรายชื่อกำลังพลจากกองงานต้นสังกัด</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Divisions row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                กองงานผู้ขอ (Requesting Division)
              </label>
              <select
                value={requestingDivId}
                onChange={e => setRequestingDivId(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {divisions.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                กองงานต้นสังกัดพนักงานที่ต้องการยืม (Source Division)
              </label>
              <select
                value={sourceDivId}
                onChange={e => {
                  setSourceDivId(Number(e.target.value));
                  setSelectedEmployees([]); // reset selected if division changes
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-blue-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                {divisions.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.code} - {d.name} ({employees.filter(x => x.division_id === d.id).length} นาย)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Internal booking indicator banner */}
          {isInternalBooking ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">การจองใช้ภายในกองงานเดียวกัน:</span> คำขอนี้จะได้รับ
                <strong className="text-emerald-900"> อนุมัติอัตโนมัติทันที </strong>
                เมื่อทำการส่งคำขอ โดยไม่ต้องรอการพิจารณาจากแอดมินภายนอก
              </div>
            </div>
          ) : (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2.5 text-xs text-blue-800">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold">การยืมตัวข้ามกองงาน:</span> คำขอจะถูกส่งไปยังแอดมินของกองงานต้นสังกัดเพื่อพิจารณาอนุมัติรายบุคคล
              </div>
            </div>
          )}

          {/* Date range picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                วันเริ่มต้นใช้งาน (Booking Date) <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={e => setBookingDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                วันสิ้นสุดการใช้งาน (End Date - หากยืมวันเดียวให้เว้นว่าง)
              </label>
              <input
                type="date"
                value={endDate}
                min={bookingDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Purpose textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              เหตุผลและวัตถุประสงค์ในการขอใช้พนักงาน <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              placeholder="ระบุภารกิจ วัตถุประสงค์ และรายละเอียดงานที่ต้องการให้กำลังพลปฏิบัติ..."
              rows={3}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Personnel Selection Section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  เลือกกำลังพลจากสังกัด ({sourceDivisionEmployees.length} นาย พร้อมให้บริการในวันที่ระบุ)
                </label>
                {unavailableCount > 0 && (
                  <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                    * ระบบกรองซ่อนกำลังพล {unavailableCount} นายที่ติดการจองในวันดังกล่าวแล้ว (แสดงเฉพาะผู้ที่ขอชื่อได้)
                  </p>
                )}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="ค้นหารหัส หรือ ชื่อกำลังพล..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-md border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Employee Selection List */}
            <div className="border border-slate-200 rounded-lg max-h-52 overflow-y-auto divide-y divide-slate-100 bg-slate-50">
              {filteredEmployees.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  {unavailableCount > 0 && allDivisionEmployees.length > 0 ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-700">ไม่มีกำลังพลที่ว่างพร้อมปฏิบัติงานในช่วงวันที่เลือก</p>
                      <p className="text-slate-400 text-[11px]">
                        (กำลังพลทั้ง {allDivisionEmployees.length} นายในสังกัดนี้ติดภารกิจหรือถูกจองไปแล้วในวันดังกล่าว)
                      </p>
                    </div>
                  ) : (
                    'ไม่พบกำลังพลในสังกัดนี้ หรือไม่ตรงกับคำค้นหา'
                  )}
                </div>
              ) : (
                filteredEmployees.map(emp => {
                  const isSelected = selectedEmployees.some(item => item.employee_code === emp.employee_code);
                  const availability = isEmployeeAvailable(emp.employee_code, bookingDate, endDate || null);

                  return (
                    <div
                      key={emp.id}
                      className={`p-2.5 flex items-center justify-between text-xs transition-colors ${
                        isSelected ? 'bg-blue-50/70 text-blue-900' : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-semibold px-1.5 py-0.5 rounded text-[11px] bg-slate-200 text-slate-700">
                          {emp.employee_code}
                        </span>
                        <div>
                          <span className="font-medium text-slate-800">{emp.full_name}</span>
                          <span className="text-slate-400 text-[11px] ml-2">{emp.position}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!availability.available ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200 font-medium">
                            ติดจอง ({availability.conflictDate})
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                            ว่างพร้อมปฏิบัติงาน
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleAddEmployee(emp)}
                          disabled={isSelected}
                          className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                            isSelected
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs cursor-pointer'
                          }`}
                        >
                          {isSelected ? 'เลือกแล้ว' : 'เลือก'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected personnel badge list */}
            <div>
              <div className="text-xs font-semibold text-slate-600 mb-2">
                กำลังพลที่เลือกในคำขอนี้ ({selectedEmployees.length} นาย):
              </div>
              {selectedEmployees.length === 0 ? (
                <div className="p-3 border border-dashed border-slate-300 rounded-lg text-center text-xs text-slate-400 bg-white">
                  ยังไม่ได้เลือกกำลังพล กรุณากดเลือกจากรายชื่อด้านบน
                </div>
              ) : (
                <div className="space-y-1.5">
                  {selectedEmployees.map((emp, index) => (
                    <div
                      key={emp.employee_code}
                      className="flex items-center justify-between p-2 rounded-lg bg-blue-50/50 border border-blue-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">#{index + 1}</span>
                        <span className="font-mono font-bold text-blue-700">{emp.employee_code}</span>
                        <span className="font-medium text-slate-800">{emp.employee_name_snapshot}</span>
                        {emp.position && <span className="text-slate-500 text-[11px]">({emp.position})</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmployee(emp.employee_code)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors"
                        title="นำออกจากคำขอ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            ยกเลิก
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(false)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              บันทึกเป็นแบบร่าง (Draft)
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {isInternalBooking ? 'บันทึกและอนุมัติทันที' : 'บันทึกและส่งพิจารณาทันที'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
