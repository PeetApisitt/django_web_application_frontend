import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingRequest, BookingRequestItem } from '../types';
import { STATUS_LABELS, canUserReviewDivision } from '../services/bookingService';
import {
  X,
  Calendar,
  Building2,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Ban,
  Send,
  Trash2,
  FileText,
  ShieldCheck,
  Info
} from 'lucide-react';

interface BookingDetailModalProps {
  bookingId: number | null;
  onClose: () => void;
  onOpenCreateModal?: () => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  bookingId,
  onClose,
}) => {
  const {
    bookings,
    currentUser,
    roleAssignments,
    getDivisionById,
    submitBooking,
    reviewItem,
    cancelBooking,
    deleteDraftBooking
  } = useApp();

  const [rejectingItemId, setRejectingItemId] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState<string>('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (bookingId === null) return null;
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return null;

  const reqDivision = getDivisionById(booking.requesting_division_id);
  const srcDivision = getDivisionById(booking.source_division_id);
  const isInternal = booking.requesting_division_id === booking.source_division_id;
  const isRequester = currentUser ? (booking.requested_by_id === currentUser.id || currentUser.is_superuser) : false;
  const canReviewSourceDiv = canUserReviewDivision(currentUser, booking.source_division_id, roleAssignments);

  const statusInfo = STATUS_LABELS[booking.status] || {
    label: booking.status,
    badgeClass: 'bg-slate-100 text-slate-700',
    bgClass: 'bg-slate-50'
  };

  const handleActionSubmit = async () => {
    setActionError(null);
    setActionSuccess(null);
    try {
      await submitBooking(booking.id);
      setActionSuccess(
        isInternal
          ? 'ส่งคำขอสำเร็จ! ระบบได้อนุมัติอัตโนมัติเนื่องจากเป็นการจองใช้ภายในกองงานเดียวกัน'
          : 'ส่งคำขอสำเร็จแล้ว ขณะนี้รอการพิจารณาจากแอดมินกองงานต้นสังกัด'
      );
    } catch (err: any) {
      setActionError(err.response?.data?.detail || err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการส่งคำขอ');
    }
  };

  const handleActionCancel = async () => {
    if (!window.confirm('คุณต้องการยกเลิกคำขอนี้ใช่หรือไม่? ระบบจะปลดการจองกำลังพลทั้งหมดทันที')) {
      return;
    }
    setActionError(null);
    setActionSuccess(null);
    try {
      await cancelBooking(booking.id);
      setActionSuccess('ยกเลิกคำขอเรียบร้อยแล้ว');
    } catch (err: any) {
      setActionError(err.response?.data?.detail || err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการยกเลิกคำขอ');
    }
  };

  const handleDeleteDraft = async () => {
    if (!window.confirm('คุณต้องการลบคำขอร่างนี้ใช่หรือไม่?')) return;
    try {
      await deleteDraftBooking(booking.id);
      onClose();
    } catch (err: any) {
      setActionError(err.response?.data?.detail || err.response?.data?.message || err.message || 'ไม่สามารถลบคำขอได้');
    }
  };

  const handleAcceptItem = async (item: BookingRequestItem) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      await reviewItem(item.id, 'ACCEPT', '');
      setActionSuccess(`อนุมัติกำลังพล ${item.employee_name_snapshot} เรียบร้อยแล้ว`);
    } catch (err: any) {
      setActionError(err.response?.data?.detail || err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการพิจารณา');
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingItemId) return;
    if (!rejectNote.trim()) {
      setActionError('กรุณาระบุหมายเหตุ/เหตุผลในการปฏิเสธ');
      return;
    }

    try {
      await reviewItem(rejectingItemId, 'REJECT', rejectNote);
      setActionSuccess('ปฏิเสธรายการกำลังพลและคืนสิทธิ์การจองแล้ว');
      setRejectingItemId(null);
      setRejectNote('');
    } catch (err: any) {
      setActionError(err.response?.data?.detail || err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการปฏิเสธ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              #{booking.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">รายละเอียดคำขอยืมตัวกำลังพล</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${statusInfo.badgeClass}`}>
                  {statusInfo.label}
                </span>
                {isInternal && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-200 border border-emerald-600 font-medium">
                    จองภายในกองงาน
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                สร้างเมื่อ {new Date(booking.created_at).toLocaleString('th-TH')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts */}
        {actionError && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{actionError}</span>
          </div>
        )}
        {actionSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key metadata grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">กองงานผู้ขอ:</span>
                <span className="font-semibold text-slate-800">
                  {reqDivision ? `${reqDivision.code} - ${reqDivision.name}` : `ID: ${booking.requesting_division_id}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-600">กองงานต้นสังกัดพนักงาน:</span>
                <span className="font-semibold text-blue-800">
                  {srcDivision ? `${srcDivision.code} - ${srcDivision.name}` : `ID: ${booking.source_division_id}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">ผู้สร้างคำขอ:</span>
                <span className="text-slate-800">{booking.requested_by_name || `User ID ${booking.requested_by_id}`}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span className="font-medium text-slate-600">ช่วงวันที่ต้องการใช้งาน:</span>
                <span className="font-semibold text-slate-900">
                  {booking.booking_date}
                  {booking.end_date && booking.end_date !== booking.booking_date
                    ? ` ถึง ${booking.end_date}`
                    : ' (1 วัน)'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">อัปเดตล่าสุด:</span>
                <span className="text-slate-700">{new Date(booking.updated_at).toLocaleString('th-TH')}</span>
              </div>
              {booking.approved_by_name && (
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-600">ผู้อนุมัติ:</span>
                  <span className="text-emerald-800 font-semibold">{booking.approved_by_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              เหตุผลและวัตถุประสงค์ในการขอใช้พนักงาน
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
              {booking.purpose}
            </div>
          </div>

          {/* Employee Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                รายชื่อพนักงานในคำขอ ({booking.items.length} นาย)
              </h4>
              {canReviewSourceDiv && booking.status === 'pending_review' && (
                <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  คุณมีสิทธิ์เป็นแอดมิน สามารถพิจารณา อนุมัติ / ปฏิเสธ ได้
                </span>
              )}
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200 bg-white shadow-xs">
              {booking.items.map((item, idx) => {
                const itemStatus = STATUS_LABELS[item.status] || {
                  label: item.status,
                  badgeClass: 'bg-slate-100 text-slate-700'
                };
                const canReviewThisItem =
                  canReviewSourceDiv && item.status === 'pending_review' && booking.status === 'pending_review';

                return (
                  <div key={item.id} className="p-3 sm:p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-semibold text-slate-400 mt-0.5">#{idx + 1}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {item.employee_code}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">
                              {item.employee_name_snapshot}
                            </span>
                          </div>
                          {item.review_note && (
                            <div className="mt-1 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200 flex items-start gap-1">
                              <Info className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                              <span>หมายเหตุ: {item.review_note}</span>
                            </div>
                          )}
                          {item.reviewed_by_name && (
                            <div className="text-[11px] text-slate-400 mt-1">
                              พิจารณาโดย: {item.reviewed_by_name}{' '}
                              {item.reviewed_at ? `(${new Date(item.reviewed_at).toLocaleString('th-TH')})` : ''}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${itemStatus.badgeClass}`}>
                          {itemStatus.label}
                        </span>

                        {/* Admin Action Buttons */}
                        {canReviewThisItem && (
                          <div className="flex items-center gap-1.5 ml-2">
                            <button
                              onClick={() => handleAcceptItem(item)}
                              className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                              title="ยอมรับพนักงานรายนี้"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              ยอมรับ
                            </button>
                            <button
                              onClick={() => {
                                setRejectingItemId(item.id);
                                setRejectNote('');
                              }}
                              className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                              title="ปฏิเสธพนักงานรายนี้ (ต้องระบุเหตุผล)"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              ปฏิเสธ
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reject Reason Form Modal */}
          {rejectingItemId && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  ระบุเหตุผลในการปฏิเสธพนักงาน
                </h5>
                <button
                  onClick={() => setRejectingItemId(null)}
                  className="text-rose-500 hover:text-rose-700 text-xs"
                >
                  ยกเลิก
                </button>
              </div>
              <textarea
                value={rejectNote}
                onChange={e => setRejectNote(e.target.value)}
                placeholder="ระบุเหตุผล เช่น ติดภารกิจราชการเร่งด่วน, มีเวรปฏิบัติหน้าที่, ฯลฯ"
                className="w-full text-xs p-2.5 rounded border border-rose-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                rows={2}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setRejectingItemId(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded"
                >
                  ปิด
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-3.5 py-1.5 text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors shadow-xs"
                >
                  ยืนยันการปฏิเสธ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {booking.status === 'draft' && (
              <span className="text-amber-700 font-medium">
                * คำขอฉบับร่างยังไม่ถูกส่งไปยังต้นสังกัด และยังไม่มีการกันสิทธิ์การจอง
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Draft Actions */}
            {booking.status === 'draft' && isRequester && (
              <>
                <button
                  onClick={handleDeleteDraft}
                  className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-300 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  ลบแบบร่าง
                </button>
                <button
                  onClick={handleActionSubmit}
                  className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  ส่งคำขอทันที
                </button>
              </>
            )}

            {/* Cancel Action */}
            {isRequester &&
              booking.status !== 'cancelled' &&
              booking.status !== 'rejected' &&
              booking.status !== 'draft' && (
                <button
                  onClick={handleActionCancel}
                  className="px-3.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 bg-rose-50 border border-rose-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Ban className="w-3.5 h-3.5" />
                  ยกเลิกคำขอ
                </button>
              )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
