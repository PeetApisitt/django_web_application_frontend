import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X, KeyRound, Building2, Lock, ArrowRight } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useApp();

  if (!isLoginModalOpen) return null;

  const handleSSOLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/api/auth/login/sso';
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsLoginModalOpen(false)}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Accent Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white px-6 pt-7 pb-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

          <button
            onClick={() => setIsLoginModalOpen(false)}
            aria-label="ปิดหน้าต่าง"
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/30 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/20 mb-2">
              <Lock className="w-3 h-3" />
              Single Sign-On Authentication
            </span>

            <h3 className="font-bold text-lg text-white tracking-tight">
              ระบบบริหารจัดการยอดกำลังพล
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              ยืนยันตัวตนผ่านระบบกลางของหน่วยงานเพื่อเข้าใช้งาน
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-800 mb-0.5">
                  เข้าสู่ระบบด้วย RTARF Mail
                </p>
                ระบบจะนำท่านไปยังหน้าลงชื่อเข้าใช้ส่วนกลางเพื่อตรวจสอบสิทธิ์ตามกองงานโดยอัตโนมัติ
              </div>
            </div>
          </div>

          {/* Primary SSO Action Button */}
          <button
            type="button"
            onClick={handleSSOLogin}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>เข้าสู่ระบบด้วย RTARF Mail</span>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>เชื่อมต่ออย่างปลอดภัยผ่านโปรโตคอลมาตรฐานขององค์กร</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>Employee Booking System</span>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};
