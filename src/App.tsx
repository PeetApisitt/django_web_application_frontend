import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BookingList } from './components/BookingList';
import { ReviewQueue } from './components/ReviewQueue';
import { AvailabilityCalendar } from './components/AvailabilityCalendar';
import { PersonnelDirectory } from './components/PersonnelDirectory';
import { ApiDocsView } from './components/ApiDocsView';
import { BookingDetailModal } from './components/BookingDetailModal';
import { CreateBookingModal } from './components/CreateBookingModal';
import { LoginModal } from './components/LoginModal';

const AppContent: React.FC = () => {
  const { setSelectedDivisionId } = useApp();
  const [activeTab, setActiveTab] = useState<string>('calendar');
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-['Prompt',sans-serif]">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'calendar' && (
          <AvailabilityCalendar
            onSelectBooking={id => setSelectedBookingId(id)}
            onOpenCreateWithDivision={divId => {
              setSelectedDivisionId(divId);
              setIsCreateModalOpen(true);
            }}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingList
            onSelectBooking={id => setSelectedBookingId(id)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewQueue
            onSelectBooking={id => setSelectedBookingId(id)}
          />
        )}

        {activeTab === 'personnel' && (
          <PersonnelDirectory />
        )}

        {activeTab === 'api' && (
          <ApiDocsView />
        )}
      </main>

      {/* Modals */}
      <BookingDetailModal
        bookingId={selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
      />

      <CreateBookingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSelectBooking={id => setSelectedBookingId(id)}
      />

      <LoginModal />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">ระบบจัดสรรและยืมตัวกำลังพล</span>
            <span>•</span>
            <span>Employee Booking System</span>
          </div>
          <p className="text-slate-400">
            พอร์ตสมบูรณ์จาก Django Backend สู่ React Web Application พร้อมระบบรักษาความปลอดภัยและการตรวจสอบสิทธิ์
          </p>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
