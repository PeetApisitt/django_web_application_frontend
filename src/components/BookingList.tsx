import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BookingRequest } from '../types';
import { STATUS_LABELS, canUserReviewDivision } from '../services/bookingService';
import { formatThaiDate, formatThaiDateRange } from '../utils/dateFormatter';
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Building2,
  User,
  Users,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw
} from 'lucide-react';

interface BookingListProps {
  onSelectBooking: (bookingId: number) => void;
  onOpenCreateModal: () => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  onSelectBooking,
  onOpenCreateModal
}) => {
  const {
    currentUser,
    accessibleBookings,
    divisions,
    roleAssignments,
    getDivisionById
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceDivFilter, setSourceDivFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: accessibleBookings.length,
      pending: accessibleBookings.filter(b => b.status === 'pending_review').length,
      approved: accessibleBookings.filter(b => b.status === 'approved' || b.status === 'partially_approved').length,
      draft: accessibleBookings.filter(b => b.status === 'draft').length
    };
  }, [accessibleBookings]);

  // Filtered list
  const filteredBookings = useMemo(() => {
    return accessibleBookings.filter(booking => {
      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'approved_group') {
          if (booking.status !== 'approved' && booking.status !== 'partially_approved') return false;
        } else if (booking.status !== statusFilter) {
          return false;
        }
      }

      // Source division filter
      if (sourceDivFilter !== 'all' && booking.source_division_id !== Number(sourceDivFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const reqDiv = getDivisionById(booking.requesting_division_id);
        const srcDiv = getDivisionById(booking.source_division_id);
        const matchId = String(booking.id).includes(q);
        const matchPurpose = booking.purpose.toLowerCase().includes(q);
        const matchRequester = (booking.requested_by_name || '').toLowerCase().includes(q);
        const matchReqDiv = (reqDiv?.name || '').toLowerCase().includes(q) || (reqDiv?.code || '').toLowerCase().includes(q);
        const matchSrcDiv = (srcDiv?.name || '').toLowerCase().includes(q) || (srcDiv?.code || '').toLowerCase().includes(q);
        const matchItems = booking.items.some(
          i => i.employee_name_snapshot.toLowerCase().includes(q) || i.employee_code.toLowerCase().includes(q)
        );

        if (!matchId && !matchPurpose && !matchRequester && !matchReqDiv && !matchSrcDiv && !matchItems) {
          return false;
        }
      }

      return true;
    });
  }, [accessibleBookings, statusFilter, sourceDivFilter, searchQuery, getDivisionById]);

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'all'
              ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">คำขอทั้งหมดในสิทธิ์</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-1">ที่ผู้ใช้มีสิทธิ์เข้าถึง</div>
        </div>

        <div
          onClick={() => setStatusFilter('pending_review')}
          className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'pending_review'
              ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-amber-800">รอพิจารณา</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700">{stats.pending}</div>
          <div className="text-[11px] text-amber-600/80 mt-1">รอแอดมินพิจารณาอนุมัติ</div>
        </div>

        <div
          onClick={() => setStatusFilter('approved_group')}
          className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'approved_group'
              ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-emerald-800">อนุมัติแล้ว</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">{stats.approved}</div>
          <div className="text-[11px] text-emerald-600/80 mt-1">อนุมัติครบและบางรายชื่อ</div>
        </div>

        <div
          onClick={() => setStatusFilter('draft')}
          className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'draft'
              ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold text-slate-600">แบบร่าง (Draft)</span>
            <AlertCircle className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-slate-700">{stats.draft}</div>
          <div className="text-[11px] text-slate-400 mt-1">ยังไม่ส่งคำขอ / แก้ไขได้</div>
        </div>
      </div>

      {/* Control bar: search, filters, create button */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="ค้นหาเลขคำขอ, ภารกิจ, กำลังพล, แผนก..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-slate-700 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="pending_review">รอพิจารณา (Pending Review)</option>
              <option value="approved_group">อนุมัติแล้ว (Approved)</option>
              <option value="draft">แบบร่าง (Draft)</option>
              <option value="rejected">ปฏิเสธ (Rejected)</option>
              <option value="cancelled">ยกเลิก (Cancelled)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sourceDivFilter}
              onChange={e => setSourceDivFilter(e.target.value)}
              className="bg-transparent border-none text-slate-700 text-xs font-medium focus:outline-none cursor-pointer max-w-[150px] truncate"
            >
              <option value="all">ทุกกองงานต้นสังกัด</option>
              {divisions.map(d => (
                <option key={d.id} value={d.id}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างคำขอใหม่</span>
          </button>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">ไม่พบรายการคำขอ</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              ยังไม่มีคำขอยืมตัวที่ตรงกับเงื่อนไขการค้นหา หรือบัญชีผู้ใช้ปัจจุบันยังไม่มีสิทธิ์ในคำขอเหล่านี้
            </p>
            <button
              onClick={onOpenCreateModal}
              className="mt-4 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              สร้างคำขอรายการแรก
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredBookings.map(booking => {
              const reqDiv = getDivisionById(booking.requesting_division_id);
              const srcDiv = getDivisionById(booking.source_division_id);
              const isInternal = booking.requesting_division_id === booking.source_division_id;
              const statusInfo = STATUS_LABELS[booking.status] || {
                label: booking.status,
                badgeClass: 'bg-slate-100 text-slate-700 border-slate-300'
              };
              const canReview = canUserReviewDivision(currentUser, booking.source_division_id, roleAssignments);

              return (
                <div
                  key={booking.id}
                  onClick={() => onSelectBooking(booking.id)}
                  className="p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Left: ID, Status, Purpose, Meta */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                          #{booking.id}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${statusInfo.badgeClass}`}>
                          {statusInfo.label}
                        </span>
                        {isInternal && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                            จองภายในกองงาน
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {formatThaiDate(booking.created_at)}
                        </span>
                      </div>

                      {/* Purpose */}
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {booking.purpose}
                      </p>

                      {/* Division routes & dates */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            {reqDiv ? `${reqDiv.code} (${reqDiv.name})` : `Div ${booking.requesting_division_id}`}
                          </span>
                          <span className="text-slate-400">➜ ยืมจาก:</span>
                          <span className="font-semibold text-blue-700">
                            {srcDiv ? `${srcDiv.code} (${srcDiv.name})` : `Div ${booking.source_division_id}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span className="font-medium text-slate-700">
                            {formatThaiDateRange(booking.booking_date, booking.end_date)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>ผู้ขอ: {booking.requested_by_name || `User ${booking.requested_by_id}`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Personnel tags preview and action cue */}
                    <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {/* Employee avatars / count preview */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-xs text-slate-700 font-medium border border-slate-200">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span>{booking.items.length} นาย</span>
                        </div>

                        {/* If pending review for admin */}
                        {booking.status === 'pending_review' && canReview && (
                          <span className="text-[11px] font-semibold px-2 py-1 rounded bg-amber-500 text-slate-950 animate-pulse">
                            ต้องพิจารณา
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-xs font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                        <span>ดูรายละเอียด</span>
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </div>
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
