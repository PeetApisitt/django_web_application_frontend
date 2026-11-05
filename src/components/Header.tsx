import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CalendarCheck2,
  FileCheck2,
  Building2,
  Code2,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Plus,
  LogOut,
  LogIn,
  Check,
  Layers,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCreateModal }) => {
  const {
    currentUser,
    setCurrentUser,
    users,
    divisions,
    employees,
    selectedDivisionId,
    setSelectedDivisionId,
    pendingReviewCountForMe,
    resetToDefaults,
    logout,
    setIsLoginModalOpen
  } = useApp();

  const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const activeDivision = divisions.find(d => d.id === selectedDivisionId) || divisions[0];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 gap-3 border-b border-slate-800/80">
          {/* Logo & System Title */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                    ระบบจัดสรรและยืมตัวกำลังพล
                  </h1>
                  <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-900/80 text-blue-300 border border-blue-700/50">
                    Employee Booking System
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  ระบบบริหารจัดการคำขอยืมตัวและตรวจสอบสถานภาพกำลังพล กพ.ทหาร
                </p>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button
                onClick={onOpenCreateModal}
                className="p-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                title="สร้างคำขอใหม่"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section: Divisions list & Current User Navbar (/api/auth/me) & Logout */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* รายชื่อกองงานแต่ละกองงาน (Divisions Menu Dropdown) */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsDivisionDropdownOpen(!isDivisionDropdownOpen);
                  setIsUserDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-xs font-medium text-slate-200 transition-colors shadow-xs"
                title="คลิกเพื่อเลือกดูกองงานแต่ละกองงาน"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">
                  {activeDivision ? `${activeDivision.code} - ${activeDivision.name}` : 'เลือกกองงาน'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {isDivisionDropdownOpen && (
                <div className="absolute left-0 lg:right-0 lg:left-auto mt-1.5 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden py-1 divide-y divide-slate-700/60 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 bg-slate-800/90 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>รายชื่อกองงาน (11 กองงาน)</span>
                    <span className="text-blue-400 font-mono">189 นาย</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-700/40">
                    {divisions.map(d => {
                      const empCount = employees.filter(e => e.division_id === d.id).length;
                      const isSelected = d.id === selectedDivisionId;

                      return (
                        <button
                          key={d.id}
                          onClick={() => {
                            setSelectedDivisionId(d.id);
                            setIsDivisionDropdownOpen(false);
                            // If not in calendar or personnel, suggest viewing calendar
                            if (activeTab !== 'calendar' && activeTab !== 'personnel') {
                              setActiveTab('calendar');
                            }
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-blue-600/30 text-blue-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono px-1.5 py-0.5 rounded text-[10px] bg-slate-900/60 text-slate-300">
                              {d.code}
                            </span>
                            <span className="truncate max-w-[170px]">{d.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span>{empCount}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Info (ดึงจาก /api/auth/me) & Logout button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* User badge with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(!isUserDropdownOpen);
                      setIsDivisionDropdownOpen(false);
                    }}
                    className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-left transition-colors shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-md bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold shrink-0">
                      {currentUser.is_superuser ? (
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <UserCheck className="w-4 h-4" />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white leading-tight">
                          {currentUser.first_name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                          {currentUser.division_code}
                        </span>
                      </div>
                      <div className="text-[10px] text-blue-300 truncate max-w-[180px]">
                        {currentUser.position || currentUser.role_label}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Switch User / Role Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden py-1 divide-y divide-slate-700/60 animate-in fade-in zoom-in-95">
                      <div className="p-3 bg-slate-900/50">
                        <div className="text-xs font-bold text-white">{currentUser.first_name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{currentUser.email}</div>
                        <div className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-blue-950 border border-blue-800 text-[10px] font-medium">
                            /api/auth/me
                          </span>
                          <span>{currentUser.role_label}</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          สลับบทบาทผู้ใช้เพื่อทดสอบสิทธิ์ (Persona Switcher)
                        </div>
                        {users.map(u => (
                          <button
                            key={u.id}
                            onClick={() => {
                              setCurrentUser(u);
                              setIsUserDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                              u.id === currentUser.id
                                ? 'bg-blue-600/30 text-blue-300 font-semibold'
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                          >
                            <div>
                              <div className="font-medium text-white">{u.first_name}</div>
                              <div className="text-[10px] text-slate-400">
                                {u.division_code} • {u.role === 'division_admin' ? 'Admin' : u.role === 'division_director' ? 'Director' : u.role === 'superuser' ? 'Superadmin' : 'User'}
                              </div>
                            </div>
                            {u.id === currentUser.id && <Check className="w-4 h-4 text-blue-400" />}
                          </button>
                        ))}
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          ออกจากระบบ (Logout)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  title="ออกจากระบบ"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 hover:text-rose-200 border border-slate-700 hover:border-rose-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              /* If logged out */
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ (Login)</span>
              </button>
            )}

            {/* Reset Defaults button */}
            <button
              onClick={resetToDefaults}
              title="รีเซ็ตข้อมูลตัวอย่างเป็นค่าเริ่มต้น"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between pt-1 overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50 rounded-t-md'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <CalendarCheck2 className="w-4 h-4 text-indigo-400" />
              <span>ปฏิทินความพร้อมกำลังพล (ภาพรวมสถานภาพ)</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50 rounded-t-md'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>รายการคำขอยืมตัว</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap relative ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50 rounded-t-md'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>รอพิจารณาอนุมัติ</span>
              {pendingReviewCountForMe > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950">
                  {pendingReviewCountForMe}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('personnel')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'personnel'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50 rounded-t-md'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>รายชื่อกำลังพล (189 นาย)</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50 rounded-t-md'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Django Ninja API Docs</span>
            </button>
          </nav>

          <button
            onClick={onOpenCreateModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างคำขอใหม่</span>
          </button>
        </div>
      </div>
    </header>
  );
};
