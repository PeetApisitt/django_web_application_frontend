import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Employee, Division } from '../types';
import { canUserManageDivision } from '../services/bookingService';
import {
  Calendar as CalendarIcon,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Plus,
  Send,
  Sparkles,
  Info,
  X
} from 'lucide-react';

interface DivisionRosterCalendarProps {
  onOpenCreateWithDivision?: (divisionId: number) => void;
  onSelectBooking?: (bookingId: number) => void;
}

export const DivisionRosterCalendar: React.FC<DivisionRosterCalendarProps> = ({
  onOpenCreateWithDivision,
  onSelectBooking
}) => {
  const {
    currentUser,
    divisions,
    employees,
    reservations,
    roleAssignments,
    selectedDivisionId,
    setSelectedDivisionId,
    toggleDirectReservation,
    getDivisionById
  } = useApp();

  // Month & Year state (default to November 2026 based on mock data & user image)
  const [year, setYear] = useState<number>(2026);
  const [month, setMonth] = useState<number>(11); // 1-12 (November)

  // Booking prompt modal state
  const [promptState, setPromptState] = useState<{
    isOpen: boolean;
    employee: Employee | null;
    date: string;
    dayNum: number;
    dayName: string;
    existingNote?: string;
    isCurrentlyReserved: boolean;
  }>({
    isOpen: false,
    employee: null,
    date: '',
    dayNum: 1,
    dayName: '',
    isCurrentlyReserved: false
  });

  const [missionNoteInput, setMissionNoteInput] = useState<string>('งานงบประมาณ');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const activeDivision = getDivisionById(selectedDivisionId) || divisions[0];

  // Check if currentUser can manage this specific division
  const canManageCurrentDivision = useMemo(() => {
    if (!currentUser) return false;
    return canUserManageDivision(currentUser, selectedDivisionId, roleAssignments);
  }, [currentUser, selectedDivisionId, roleAssignments]);

  // Employees in selected division
  const divisionEmployees = useMemo(() => {
    return employees.filter(e => e.division_id === selectedDivisionId);
  }, [employees, selectedDivisionId]);

  // Generate days in selected month
  const monthDays = useMemo(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArr: {
      dayNum: number;
      dateStr: string;
      dayOfWeek: number; // 0 = Sun, 1 = Mon, ...
      thaiDayName: string;
      isWeekend: boolean;
    }[] = [];

    const thaiDayNames = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();
      const padDay = String(day).padStart(2, '0');
      const padMonth = String(month).padStart(2, '0');
      const dateStr = `${year}-${padMonth}-${padDay}`;

      daysArr.push({
        dayNum: day,
        dateStr,
        dayOfWeek,
        thaiDayName: thaiDayNames[dayOfWeek],
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6
      });
    }

    return daysArr;
  }, [year, month]);

  // Month navigation
  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  // Click on a cell toggle
  const handleCellClick = (emp: Employee, day: typeof monthDays[0]) => {
    if (!canManageCurrentDivision) {
      setFeedbackMessage({
        type: 'info',
        text: `โหมดดูข้อมูล: สามารถกดจองได้เฉพาะแอดมินของกองงาน ${activeDivision.name} (${activeDivision.code}) เท่านั้น แต่ท่านสามารถดูสถานภาพเพื่อประกอบการตัดสินใจยืมตัวได้`
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
      return;
    }

    // Check if already reserved
    const existing = reservations.find(
      r => r.employee_code === emp.employee_code && r.booking_date === day.dateStr
    );

    if (existing) {
      // Prompt to release
      setPromptState({
        isOpen: true,
        employee: emp,
        date: day.dateStr,
        dayNum: day.dayNum,
        dayName: day.thaiDayName,
        existingNote: existing.mission_note || 'ติดภารกิจ',
        isCurrentlyReserved: true
      });
    } else {
      // Prompt to reserve with mission note
      setMissionNoteInput('ว.กพ');
      setPromptState({
        isOpen: true,
        employee: emp,
        date: day.dateStr,
        dayNum: day.dayNum,
        dayName: day.thaiDayName,
        isCurrentlyReserved: false
      });
    }
  };

  const handleConfirmReservation = () => {
    if (!promptState.employee) return;
    try {
      const result = toggleDirectReservation(
        promptState.employee.employee_code,
        promptState.date,
        missionNoteInput
      );
      setPromptState(prev => ({ ...prev, isOpen: false }));
      setFeedbackMessage({
        type: 'success',
        text: result.added
          ? `บันทึกการจอง ${promptState.employee.full_name} วันที่ ${promptState.dayNum} เรียบร้อยแล้ว (ภารกิจ: ${missionNoteInput})`
          : `ปลดการจอง ${promptState.employee.full_name} วันที่ ${promptState.dayNum} เรียบร้อยแล้ว`
      });
      setTimeout(() => setFeedbackMessage(null), 3500);
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: err.message || 'เกิดข้อผิดพลาดในการจอง' });
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  const handleReleaseReservation = () => {
    if (!promptState.employee) return;
    try {
      toggleDirectReservation(promptState.employee.employee_code, promptState.date);
      setPromptState(prev => ({ ...prev, isOpen: false }));
      setFeedbackMessage({
        type: 'success',
        text: `ปลดการจองกำลังพล ${promptState.employee.full_name} วันที่ ${promptState.dayNum} คืนสถานะว่างเรียบร้อยแล้ว`
      });
      setTimeout(() => setFeedbackMessage(null), 3500);
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: err.message || 'เกิดข้อผิดพลาดในการปลดการจอง' });
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  // Division summary calculations for selected month
  const stats = useMemo(() => {
    const totalStaff = divisionEmployees.length;
    let totalReservedPersonDays = 0;
    const totalPossiblePersonDays = totalStaff * monthDays.length;

    divisionEmployees.forEach(emp => {
      const empResCount = reservations.filter(
        r =>
          r.employee_code === emp.employee_code &&
          r.booking_date.startsWith(`${year}-${String(month).padStart(2, '0')}`)
      ).length;
      totalReservedPersonDays += empResCount;
    });

    const availabilityPercent =
      totalPossiblePersonDays > 0
        ? Math.round(((totalPossiblePersonDays - totalReservedPersonDays) / totalPossiblePersonDays) * 100)
        : 100;

    return {
      totalStaff,
      totalReservedPersonDays,
      availabilityPercent
    };
  }, [divisionEmployees, reservations, year, month, monthDays]);

  const presetMissions = ['งานงบประมาณ', 'ภารกิจพิเศษ', 'ว.กพ', 'ว.บก', 'ฝกพ'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden space-y-0">
      {/* Top Banner & Control Header */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title & Division Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  ปฏิทินสรุปยอดภาพรวมสถานภาพกำลังพล
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                  ด/ป {month} {year}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ตารางจัดสรรเวรปฏิบัติหน้าที่และการจองใช้กำลังพลรายวัน
              </p>
            </div>
          </div>

          {/* Controls: Division Select Box & Month Navigator */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Division select box (Requirement 2) */}
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-slate-400 hidden sm:inline">กองงาน:</span>
              <select
                value={selectedDivisionId}
                onChange={e => setSelectedDivisionId(Number(e.target.value))}
                className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer max-w-[200px]"
              >
                {divisions.map(d => (
                  <option key={d.id} value={d.id} className="bg-slate-800 text-white">
                    {d.code} - {d.name} ({employees.filter(x => x.division_id === d.id).length} นาย)
                  </option>
                ))}
              </select>
            </div>

            {/* Month & Year Navigation */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg text-xs overflow-hidden">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="เดือนก่อนหน้า"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="px-2.5 font-semibold text-slate-200">
                {month === 10 ? 'ตุลาคม' : month === 11 ? 'พฤศจิกายน' : month === 12 ? 'ธันวาคม' : `เดือน ${month}`} {year}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="เดือนถัดไป"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Action to request personnel */}
            {onOpenCreateWithDivision && (
              <button
                onClick={() => onOpenCreateWithDivision(selectedDivisionId)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                title="สร้างคำขอยืมตัวกำลังพลจากกองงานนี้"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ขอยืมตัวจากกองนี้</span>
              </button>
            )}
          </div>
        </div>

        {/* Permission and Status Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {canManageCurrentDivision ? (
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>คุณคือแอดมินของกองงานนี้:</strong> สามารถคลิกที่ <strong>Toggle</strong> ในตารางเพื่อจองหรือปลดจองกำลังพลในสังกัดได้โดยตรง
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-blue-300 bg-blue-950/40 border border-blue-800/50 px-2.5 py-1 rounded-md">
                <Eye className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>โหมดดูข้อมูล (Read-Only):</strong> ท่านสามารถดูสถานภาพได้ทุกกองงานเพื่อประกอบการตัดสินใจยืมตัว (การกดจองจำกัดเฉพาะแอดมินของกองงานนี้)
                </span>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <div>
              กำลังพล: <strong className="text-white">{stats.totalStaff}</strong> นาย
            </div>
            <div>•</div>
            <div>
              ความพร้อมเฉลี่ย: <strong className="text-emerald-400">{stats.availabilityPercent}%</strong>
            </div>
            <div>•</div>
            <div>
              ถูกจองในเดือนนี้: <strong className="text-amber-300">{stats.totalReservedPersonDays}</strong> วัน/คน
            </div>
          </div>
        </div>
      </div>

      {/* Floating feedback alert */}
      {feedbackMessage && (
        <div
          className={`p-3 text-xs flex items-center justify-between border-b ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : feedbackMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : feedbackMessage.type === 'error' ? (
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Roster Calendar Table (Matrix Table Matching User Attachment) */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-center border-collapse border border-slate-300 font-sans text-xs">
          <thead>
            {/* Row 1: Header - Day of Week (พฤ., ศ., ส., อา., จ., อ., พ., ...) */}
            <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-300">
              <th className="p-2 border-r border-slate-300 w-12 sticky left-0 bg-slate-100 z-20">
                #
              </th>
              <th className="p-2 border-r border-slate-300 text-left min-w-[200px] sm:min-w-[220px] sticky left-12 bg-slate-100 z-20">
                ยศ - ชื่อ - สกุล
              </th>
              {monthDays.map(d => (
                <th
                  key={`dayname-${d.dayNum}`}
                  className={`p-1 border-r border-slate-300 min-w-[54px] text-[11px] font-medium ${
                    d.isWeekend ? 'bg-amber-100/70 text-amber-900' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {d.thaiDayName}
                </th>
              ))}
            </tr>

            {/* Row 2: Header - Day Numbers (01, 02, 03, ... 30/31) */}
            <tr className="bg-slate-200 text-slate-900 font-bold border-b border-slate-400">
              <th className="p-1.5 border-r border-slate-300 sticky left-0 bg-slate-200 z-20 text-[11px]">
                ลำดับ
              </th>
              <th className="p-1.5 border-r border-slate-300 text-left sticky left-12 bg-slate-200 z-20 text-[11px]">
                ตำแหน่ง / รหัส
              </th>
              {monthDays.map(d => (
                <th
                  key={`daynum-${d.dayNum}`}
                  className={`p-1.5 border-r border-slate-300 text-center font-mono text-xs ${
                    d.isWeekend ? 'bg-amber-200/80 text-amber-950 font-black' : 'bg-slate-200 text-slate-900'
                  }`}
                >
                  {String(d.dayNum).padStart(2, '0')}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {divisionEmployees.length === 0 ? (
              <tr>
                <td colSpan={monthDays.length + 2} className="p-8 text-center text-slate-400">
                  ไม่พบข้อมูลกำลังพลในกองงานนี้
                </td>
              </tr>
            ) : (
              divisionEmployees.map((emp, index) => (
                <tr key={emp.id} className="hover:bg-slate-50/90 transition-colors group">
                  {/* Row index */}
                  <td className="p-1.5 border-r border-slate-200 font-semibold text-slate-500 bg-white group-hover:bg-slate-50 sticky left-0 z-10 text-[11px]">
                    {index + 1}
                  </td>

                  {/* Employee Name & Position */}
                  <td className="p-1.5 border-r border-slate-200 text-left bg-white group-hover:bg-slate-50 sticky left-12 z-10">
                    <div className="font-bold text-slate-900 leading-tight truncate max-w-[200px]">
                      {emp.full_name}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono text-blue-700 bg-blue-50 px-1 rounded">
                        {emp.employee_code}
                      </span>
                      <span className="truncate max-w-[130px]">{emp.position || 'เจ้าหน้าที่'}</span>
                    </div>
                  </td>

                  {/* Calendar cells with toggle buttons and mission comment */}
                  {monthDays.map(day => {
                    const reservation = reservations.find(
                      r => r.employee_code === emp.employee_code && r.booking_date === day.dateStr
                    );
                    const isReserved = !!reservation;
                    const missionNote = reservation?.mission_note || 'ติดภารกิจ';

                    return (
                      <td
                        key={day.dateStr}
                        className={`p-1 border-r border-slate-200 align-middle transition-colors relative ${
                          day.isWeekend ? 'bg-amber-50/40' : 'bg-white'
                        } ${isReserved ? 'bg-rose-50/60' : ''}`}
                      >
                        <div className="flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5">
                          {/* Comment เล็กๆ เหนือ toggle ว่าใช้ชื่อในภารกิจอะไร (Requirement 2.1) */}
                          {isReserved ? (
                            <span
                              className="text-[9px] font-bold text-rose-700 bg-rose-100/90 border border-rose-300 px-1 py-0.2 rounded mb-1 truncate max-w-[50px] shadow-2xs leading-none"
                              title={`ภารกิจ: ${missionNote}`}
                            >
                              {missionNote}
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-300 font-mono mb-1 leading-none">
                              {/* Blank / placeholder to keep uniform height */}
                              &nbsp;
                            </span>
                          )}

                          {/* Toggle Switch Component (Green = available, Red = reserved) */}
                          <button
                            type="button"
                            onClick={() => handleCellClick(emp, day)}
                            disabled={!canManageCurrentDivision && !isReserved}
                            title={
                              canManageCurrentDivision
                                ? isReserved
                                  ? `คลิกเพื่อปลดการจอง (${emp.full_name} วันที่ ${day.dayNum} - ${missionNote})`
                                  : `คลิกเพื่อกดจองกำลังพล (${emp.full_name} วันที่ ${day.dayNum})`
                                : isReserved
                                ? `ติดจอง: ${missionNote} (เฉพาะแอดมินของกองงานที่สามารถแก้ไข)`
                                : `ว่างพร้อมปฏิบัติงาน (เฉพาะแอดมินของกองงานที่สามารถจอง)`
                            }
                            className={`w-9 h-5 rounded-full p-0.5 transition-all flex items-center shadow-xs cursor-pointer ${
                              isReserved
                                ? 'bg-rose-600 justify-end ring-1 ring-rose-600/30'
                                : 'bg-emerald-600 justify-start hover:bg-emerald-500 ring-1 ring-emerald-600/30'
                            } ${!canManageCurrentDivision ? 'opacity-85 cursor-default' : 'active:scale-95'}`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center text-[8px] font-black leading-none ${
                                isReserved ? 'text-rose-600' : 'text-emerald-700'
                              }`}
                            >
                              {isReserved ? 'จ' : 'ม'}
                            </span>
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Legend & Help Footer Bar */}
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-700">สัญลักษณ์สถานะ:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span className="text-emerald-800 font-medium">สีเขียว ('ม') = ว่าง / พร้อมปฏิบัติงาน</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-3 rounded-full bg-rose-600 inline-block"></span>
            <span className="text-rose-800 font-medium">สีแดง ('จ') = จองแล้ว (มีชื่อภารกิจกำกับเหนือ toggle)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300 inline-block"></span>
            <span className="text-amber-900">วันเสาร์-อาทิตย์</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500">
          * แอดมินกองงานกด toggle เพื่อบันทึกภารกิจและกันสิทธิ์การจองซ้อนได้ทันที
        </div>
      </div>

      {/* Interactive Modal to Enter/Edit Mission Note or Release Reservation */}
      {promptState.isOpen && promptState.employee && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                    promptState.isCurrentlyReserved ? 'bg-rose-600' : 'bg-emerald-600'
                  }`}
                >
                  {promptState.isCurrentlyReserved ? <XCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {promptState.isCurrentlyReserved ? 'จัดการสิทธิ์ / ปลดการจอง' : 'จองกำลังพลในสังกัด'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {promptState.employee.full_name} ({promptState.employee.employee_code})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPromptState(prev => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">วันที่:</span>
                  <span className="font-bold text-slate-800">
                    {promptState.dayName} ที่ {promptState.dayNum} ({promptState.date})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">สังกัด:</span>
                  <span className="font-semibold text-blue-700">
                    {activeDivision.code} - {activeDivision.name}
                  </span>
                </div>
                {promptState.isCurrentlyReserved && (
                  <div className="flex justify-between text-rose-700 pt-1 border-t border-slate-200 font-medium">
                    <span>ภารกิจปัจจุบัน:</span>
                    <span>{promptState.existingNote}</span>
                  </div>
                )}
              </div>

              {!promptState.isCurrentlyReserved ? (
                /* New Reservation */
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    ระบุชื่อภารกิจที่ใช้ชื่อกำลังพล (จะแสดงเหนือ Toggle สีแดง):
                  </label>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {presetMissions.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMissionNoteInput(m)}
                        className={`px-2 py-1 text-[11px] rounded-md border transition-all ${
                          missionNoteInput === m
                            ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold ring-1 ring-rose-400'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={missionNoteInput}
                    onChange={e => setMissionNoteInput(e.target.value)}
                    placeholder="พิมพ์ชื่อภารกิจ หรือเลือกจากปุ่มด้านบน..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    maxLength={30}
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400">
                    * เมื่อกดยืนยัน ปุ่ม toggle จะเปลี่ยนเป็นสีแดง และมีข้อความกำกับเหนือปุ่มตามที่ท่านระบุ
                  </p>
                </div>
              ) : (
                /* Already Reserved - Option to change note or release */
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
                    <p className="font-semibold">กำลังพลรายนี้ถูกจองในวันที่ระบุแล้ว</p>
                    <p className="text-[11px] text-rose-600 mt-0.5">
                      ท่านสามารถกด <strong>"ปลดการจอง"</strong> เพื่อคืนสถานะให้เป็น <strong>สีเขียว (ว่าง)</strong> หรือเปลี่ยนชื่อภารกิจ
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      แก้ไขชื่อภารกิจ:
                    </label>
                    <input
                      type="text"
                      value={missionNoteInput}
                      onChange={e => setMissionNoteInput(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-100 px-5 py-3.5 border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setPromptState(prev => ({ ...prev, isOpen: false }))}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                ปิด
              </button>

              <div className="flex items-center gap-2">
                {promptState.isCurrentlyReserved && (
                  <button
                    type="button"
                    onClick={handleReleaseReservation}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ปลดการจอง (คืนสถานะเขียว)
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {promptState.isCurrentlyReserved ? 'บันทึกการเปลี่ยนภารกิจ' : 'ยืนยันการจอง (เปลี่ยนเป็นสีแดง)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
