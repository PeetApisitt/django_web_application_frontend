import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  Division,
  Employee,
  DivisionRoleAssignment,
  BookingRequest,
  EmployeeBookingReservation,
  CreateBookingRequestInput
} from '../types';
import { INITIAL_DIVISIONS, INITIAL_EMPLOYEES, DEMO_USERS, INITIAL_ROLE_ASSIGNMENTS } from '../data/seedData';
import { INITIAL_BOOKINGS, INITIAL_RESERVATIONS } from '../data/mockBookings';
import {
  createBookingRequest as createBookingService,
  submitBookingRequest as submitBookingService,
  reviewBookingItem as reviewItemService,
  cancelBookingRequest as cancelBookingService,
  isBookingAccessible,
  canUserReviewDivision,
  canUserManageDivision,
  getDatesBetween
} from '../services/bookingService';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  divisions: Division[];
  employees: Employee[];
  bookings: BookingRequest[];
  reservations: EmployeeBookingReservation[];
  roleAssignments: DivisionRoleAssignment[];
  accessibleBookings: BookingRequest[];
  pendingReviewCountForMe: number;
  myDraftsCount: number;
  approvedCount: number;
  selectedDivisionId: number;
  setSelectedDivisionId: (id: number) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  login: (userId: number) => void;
  logout: () => void;
  getAuthMe: () => Promise<any>;
  toggleDirectReservation: (
    employeeCode: string,
    date: string,
    missionNote?: string
  ) => { added: boolean; reservation?: EmployeeBookingReservation };
  createBooking: (input: CreateBookingRequestInput) => BookingRequest;
  submitBooking: (bookingId: number) => void;
  reviewItem: (itemId: number, action: 'ACCEPT' | 'REJECT', note: string) => void;
  cancelBooking: (bookingId: number) => void;
  deleteDraftBooking: (bookingId: number) => void;
  resetToDefaults: () => void;
  isEmployeeAvailable: (
    employeeCode: string,
    startDate: string,
    endDate?: string | null,
    excludeBookingId?: number
  ) => { available: boolean; conflictDate?: string; missionNote?: string };
  getDivisionById: (id: number) => Division | undefined;
  getEmployeeByCode: (code: string) => Employee | undefined;
}

const STORAGE_KEYS = {
  BOOKINGS: 'employee_bookings_data_v1',
  RESERVATIONS: 'employee_reservations_data_v1',
  CURRENT_USER_ID: 'employee_bookings_user_id_v1',
  SELECTED_DIV_ID: 'employee_bookings_selected_div_v1'
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (savedUserId === 'guest') return null;
    if (savedUserId) {
      const found = DEMO_USERS.find(u => u.id === Number(savedUserId));
      if (found) return found;
    }
    return DEMO_USERS[0]; // Admin of J101 by default
  });

  const [selectedDivisionId, setSelectedDivisionId] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_DIV_ID);
    if (saved) return Number(saved);
    return currentUser?.division_id || 1;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [reservations, setReservations] = useState<EmployeeBookingReservation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reservations', e);
      }
    }
    return INITIAL_RESERVATIONS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, String(currentUser.id));
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, 'guest');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_DIV_ID, String(selectedDivisionId));
  }, [selectedDivisionId]);

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      setSelectedDivisionId(user.division_id);
    }
  };

  const login = (userId: number) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      handleSetCurrentUser(found);
      setIsLoginModalOpen(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Filter accessible bookings based on user & roles
  const accessibleBookings = useMemo(() => {
    if (!currentUser) return [];
    return bookings.filter(b => isBookingAccessible(b, currentUser, INITIAL_ROLE_ASSIGNMENTS));
  }, [bookings, currentUser]);

  // Count items awaiting currentUser's review
  const pendingReviewCountForMe = useMemo(() => {
    if (!currentUser) return 0;
    return bookings.reduce((total, b) => {
      if (b.status !== 'pending_review') return total;
      const canReview = canUserReviewDivision(currentUser, b.source_division_id, INITIAL_ROLE_ASSIGNMENTS);
      if (!canReview) return total;
      const pendingItems = b.items.filter(i => i.status === 'pending_review').length;
      return total + (pendingItems > 0 ? 1 : 0);
    }, 0);
  }, [bookings, currentUser]);

  const myDraftsCount = useMemo(() => {
    if (!currentUser) return 0;
    return bookings.filter(b => b.requested_by_id === currentUser.id && b.status === 'draft').length;
  }, [bookings, currentUser]);

  const approvedCount = useMemo(() => {
    return accessibleBookings.filter(b => b.status === 'approved' || b.status === 'partially_approved').length;
  }, [accessibleBookings]);

  const getDivisionById = (id: number): Division | undefined => {
    return INITIAL_DIVISIONS.find(d => d.id === id);
  };

  const getEmployeeByCode = (code: string): Employee | undefined => {
    return INITIAL_EMPLOYEES.find(e => e.employee_code.toLowerCase() === code.trim().toLowerCase());
  };

  const isEmployeeAvailable = (
    employeeCode: string,
    startDate: string,
    endDate?: string | null,
    excludeBookingId?: number
  ): { available: boolean; conflictDate?: string; missionNote?: string } => {
    if (!startDate) return { available: true };
    const dates = getDatesBetween(startDate, endDate);

    for (const d of dates) {
      const conflict = reservations.find(
        r =>
          r.employee_code === employeeCode &&
          r.booking_date === d &&
          (excludeBookingId ? r.booking_request_id !== excludeBookingId : true)
      );
      if (conflict) {
        return {
          available: false,
          conflictDate: d,
          missionNote: conflict.mission_note || 'ติดภารกิจ'
        };
      }
    }
    return { available: true };
  };

  // Toggle direct reservation by Division Admin from Calendar
  const toggleDirectReservation = (
    employeeCode: string,
    date: string,
    missionNote?: string
  ): { added: boolean; reservation?: EmployeeBookingReservation } => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      throw new Error('กรุณาเข้าสู่ระบบก่อนทำการจองกำลังพล');
    }

    const employee = INITIAL_EMPLOYEES.find(e => e.employee_code === employeeCode);
    if (!employee) {
      throw new Error('ไม่พบข้อมูลพนักงานที่ระบุ');
    }

    // Permission check: only admin of employee's division (or superuser) can reserve directly
    const canManage = canUserManageDivision(currentUser, employee.division_id, INITIAL_ROLE_ASSIGNMENTS);
    if (!canManage) {
      const empDiv = getDivisionById(employee.division_id);
      throw new Error(
        `คุณไม่มีสิทธิ์ในการจองพนักงานของกองงาน ${empDiv?.name || ''} (สามารถกดจองได้เฉพาะพนักงานในสังกัดกองงานของคุณเท่านั้น)`
      );
    }

    // Check if already reserved on this date
    const existingIndex = reservations.findIndex(
      r => r.employee_code === employeeCode && r.booking_date === date
    );

    if (existingIndex >= 0) {
      // Remove reservation
      const newReservations = reservations.filter((_, idx) => idx !== existingIndex);
      setReservations(newReservations);
      return { added: false };
    } else {
      // Add new reservation
      const nextId = reservations.reduce((max, r) => Math.max(max, r.id), 0) + 1;
      const newRes: EmployeeBookingReservation = {
        id: nextId,
        booking_request_id: null,
        booking_request_item_id: null,
        employee_code: employeeCode,
        booking_date: date,
        mission_note: missionNote?.trim() || 'ภารกิจประจำกอง',
        created_at: new Date().toISOString(),
        is_direct_admin_booking: true
      };
      setReservations(prev => [...prev, newRes]);
      return { added: true, reservation: newRes };
    }
  };

  const getAuthMe = async () => {
    return {
      status: 200,
      endpoint: '/api/auth/me',
      authenticated: !!currentUser,
      user: currentUser
        ? {
            id: currentUser.id,
            username: currentUser.username,
            employee_code: currentUser.employee_code,
            first_name: currentUser.first_name,
            position: currentUser.position,
            email: currentUser.email,
            is_superuser: currentUser.is_superuser,
            division: {
              id: currentUser.division_id,
              code: currentUser.division_code,
              name: getDivisionById(currentUser.division_id)?.name || ''
            },
            role: currentUser.role,
            role_label: currentUser.role_label
          }
        : null
    };
  };

  const createBooking = (input: CreateBookingRequestInput): BookingRequest => {
    if (!currentUser) throw new Error('กรุณาเข้าสู่ระบบก่อนสร้างคำขอ');
    const { newBooking } = createBookingService(input, currentUser, bookings);
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const submitBooking = (bookingId: number) => {
    if (!currentUser) throw new Error('กรุณาเข้าสู่ระบบ');
    const result = submitBookingService(bookingId, currentUser, bookings, reservations);
    setBookings(result.updatedBookings);
    setReservations(result.updatedReservations);
  };

  const reviewItem = (itemId: number, action: 'ACCEPT' | 'REJECT', note: string) => {
    if (!currentUser) throw new Error('กรุณาเข้าสู่ระบบ');
    const result = reviewItemService(
      itemId,
      currentUser,
      action,
      note,
      bookings,
      reservations,
      INITIAL_ROLE_ASSIGNMENTS
    );
    setBookings(result.updatedBookings);
    setReservations(result.updatedReservations);
  };

  const cancelBooking = (bookingId: number) => {
    if (!currentUser) throw new Error('กรุณาเข้าสู่ระบบ');
    const result = cancelBookingService(bookingId, currentUser, bookings, reservations);
    setBookings(result.updatedBookings);
    setReservations(result.updatedReservations);
  };

  const deleteDraftBooking = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    if (booking.status !== 'draft') {
      throw new Error('สามารถลบได้เฉพาะรายการที่เป็นแบบร่างเท่านั้น');
    }
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    setBookings(INITIAL_BOOKINGS);
    setReservations(INITIAL_RESERVATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        users: DEMO_USERS,
        divisions: INITIAL_DIVISIONS,
        employees: INITIAL_EMPLOYEES,
        bookings,
        reservations,
        roleAssignments: INITIAL_ROLE_ASSIGNMENTS,
        accessibleBookings,
        pendingReviewCountForMe,
        myDraftsCount,
        approvedCount,
        selectedDivisionId,
        setSelectedDivisionId,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
        getAuthMe,
        toggleDirectReservation,
        createBooking,
        submitBooking,
        reviewItem,
        cancelBooking,
        deleteDraftBooking,
        resetToDefaults,
        isEmployeeAvailable,
        getDivisionById,
        getEmployeeByCode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
