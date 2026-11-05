import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ShieldCheck, X, LogIn } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, users, login } = useApp();

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <LogIn className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">เข้าสู่ระบบ (Authentication)</h3>
              <p className="text-[11px] text-slate-400">เลือกบัญชีผู้ใช้สำหรับทดสอบสิทธิ์ในระบบ</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600">
            เลือกล็อกอินด้วยบัญชีจำลองตามบทบาท (ผูกข้อมูลจาก <code>/api/auth/me</code>):
          </p>

          <div className="space-y-2">
            {users.map(u => (
              <button
                key={u.id}
                onClick={() => login(u.id)}
                className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-700">
                    {u.is_superuser ? <ShieldCheck className="w-4 h-4 text-amber-500" /> : <UserCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                      {u.first_name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {u.division_code} • {u.position || u.role_label}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600">
                  เข้าสู่ระบบ
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-right">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
