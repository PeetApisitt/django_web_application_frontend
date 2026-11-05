import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Employee } from '../types';
import {
  Users,
  Search,
  Building2,
  Mail,
  Briefcase,
  IdCard,
  Plus,
  Filter
} from 'lucide-react';

interface PersonnelDirectoryProps {
  onOpenCreateWithEmployee?: (emp: Employee) => void;
}

export const PersonnelDirectory: React.FC<PersonnelDirectoryProps> = () => {
  const { employees, divisions } = useApp();

  const [selectedDivisionCode, setSelectedDivisionCode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (selectedDivisionCode !== 'all' && emp.division_code !== selectedDivisionCode) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCode = emp.employee_code.toLowerCase().includes(q);
        const matchName = emp.full_name.toLowerCase().includes(q);
        const matchPos = emp.position.toLowerCase().includes(q);
        const matchEmail = emp.email.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchPos && !matchEmail) return false;
      }
      return true;
    });
  }, [employees, selectedDivisionCode, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              ทำเนียบกำลังพลและกองงาน (Personnel Directory)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ข้อมูลกำลังพลทั้ง 189 นาย ครอบคลุม 11 กองงาน จากฐานข้อมูลหลัก (data.xlsx)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 text-xs">
            <span className="text-slate-500">จำนวนกำลังพล: </span>
            <span className="font-bold text-blue-800 text-sm">{employees.length}</span> นาย
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <span className="text-slate-500">กองงาน: </span>
            <span className="font-bold text-slate-800 text-sm">{divisions.length}</span> ส่วน
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="ค้นหารหัส, ชื่อ-นามสกุล, ตำแหน่ง, อีเมล..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedDivisionCode}
            onChange={e => setSelectedDivisionCode(e.target.value)}
            className="w-full md:w-auto text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
          >
            <option value="all">ทุกกองงาน (189 นาย)</option>
            {divisions.map(d => {
              const count = employees.filter(e => e.division_code === d.code).length;
              return (
                <option key={d.id} value={d.code}>
                  {d.code} - {d.name} ({count} นาย)
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Grid of employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredEmployees.map(emp => (
          <div
            key={emp.id}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {emp.employee_code}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {emp.division_code}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {emp.full_name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{emp.position || 'เจ้าหน้าที่'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{emp.division_name}</span>
              </div>
              {emp.email && (
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate font-mono">{emp.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">ไม่พบรายชื่อกำลังพลตามเงื่อนไขที่ค้นหา</p>
        </div>
      )}
    </div>
  );
};
