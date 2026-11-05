import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BookingRequest, BookingRequestItem } from '../types';
import { canUserReviewDivision } from '../services/bookingService';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Building2,
  Calendar,
  User,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface ReviewQueueProps {
  onSelectBooking: (bookingId: number) => void;
}

export const ReviewQueue: React.FC<ReviewQueueProps> = ({ onSelectBooking }) => {
  const {
    currentUser,
    bookings,
    roleAssignments,
    getDivisionById,
    reviewItem
  } = useApp();

  const [rejectingItem, setRejectingItem] = useState<{ id: number; name: string } | null>(null);
  const [rejectNote, setRejectNote] = useState<string>('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Find all items needing review where currentUser is admin of source division
  const pendingQueue = useMemo(() => {
    const list: {
      booking: BookingRequest;
      item: BookingRequestItem;
    }[] = [];

    bookings.forEach(b => {
      if (b.status === 'pending_review') {
        const canReview = canUserReviewDivision(currentUser, b.source_division_id, roleAssignments);
        if (canReview) {
          b.items.forEach(item => {
            if (item.status === 'pending_review') {
              list.push({ booking: b, item });
            }
          });
        }
      }
    });

    return list;
  }, [bookings, currentUser, roleAssignments]);

  const handleAccept = (item: BookingRequestItem) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      reviewItem(item.id, 'ACCEPT', '');
      setActionSuccess(`อนุมัติกำลังพล ${item.employee_name_snapshot} (${item.employee_code}) เรียบร้อยแล้ว`);
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาดในการพิจารณา');
    }
  };

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    if (!rejectNote.trim()) {
      setActionError('กรุณาระบุหมายเหตุหรือเหตุผลในการปฏิเสธ');
      return;
    }

    try {
      reviewItem(rejectingItem.id, 'REJECT', rejectNote);
      setActionSuccess(`ปฏิเสธกำลังพล ${rejectingItem.name} และคืนสิทธิ์การจองแล้ว`);
      setRejectingItem(null);
      setRejectNote('');
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาดในการปฏิเสธ');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              คิวพิจารณาอนุมัติคำขอยืมตัว (Review Queue)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              พิจารณาคำขอยืมตัวกำลังพลในกองงานที่คุณรับหน้าที่แอดมิน (Admin) โดยสามารถอนุมัติหรือปฏิเสธรายบุคคลได้
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-xs">
            <span className="text-slate-500">รอดำเนินการ: </span>
            <span className="font-bold text-amber-800 text-sm">{pendingQueue.length}</span> รายการ
          </div>
        </div>
      </div>

      {actionError && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          <span>{actionError}</span>
        </div>
      )}
      {actionSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Reject reason popup */}
      {rejectingItem && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-3 shadow-md animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              ระบุเหตุผลในการปฏิเสธ: {rejectingItem.name}
            </h4>
            <button
              onClick={() => setRejectingItem(null)}
              className="text-rose-500 hover:text-rose-700 text-xs"
            >
              ยกเลิก
            </button>
          </div>
          <p className="text-[11px] text-rose-700">
            * ระบบจะยกเลิกการกันสิทธิ์ (Reservation) ของพนักงานรายนี้ และแจ้งเหตุผลกลับไปยังผู้สร้างคำขอ
          </p>
          <textarea
            value={rejectNote}
            onChange={e => setRejectNote(e.target.value)}
            placeholder="ระบุเหตุผล เช่น ติดภารกิจราชการเร่งด่วน, มีเวรปฏิบัติหน้าที่, ฯลฯ"
            className="w-full text-xs p-2.5 rounded-lg border border-rose-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRejectingItem(null)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleConfirmReject}
              className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors shadow-xs"
            >
              ยืนยันการปฏิเสธ
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {pendingQueue.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">ไม่มีคำขอค้างรอการพิจารณา</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              คำขอยืมตัวกำลังพลในกองงานที่คุณดูแลได้รับการพิจารณาครบถ้วนแล้ว หรือสลับบทบาทเป็น Admin ของกองงานอื่นเพื่อทดสอบ
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {pendingQueue.map(({ booking, item }) => {
              const reqDiv = getDivisionById(booking.requesting_division_id);
              const srcDiv = getDivisionById(booking.source_division_id);

              return (
                <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Personnel and Request details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          {item.employee_code}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {item.employee_name_snapshot}
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                          รอพิจารณา
                        </span>
                        <button
                          onClick={() => onSelectBooking(booking.id)}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          คำขอ #{booking.id}
                        </button>
                      </div>

                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-700">ภารกิจ: </span>
                        {booking.purpose}
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>ผู้ขอ: {reqDiv ? `${reqDiv.code} - ${reqDiv.name}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span className="font-medium text-slate-800">
                            วันที่: {booking.booking_date}
                            {booking.end_date && booking.end_date !== booking.booking_date ? ` ถึง ${booking.end_date}` : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>โดย: {booking.requested_by_name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        onClick={() => handleAccept(item)}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        อนุมัติ
                      </button>

                      <button
                        onClick={() => {
                          setRejectingItem({ id: item.id, name: item.employee_name_snapshot });
                          setRejectNote('');
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        ปฏิเสธ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
