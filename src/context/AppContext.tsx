import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  User,
  Division,
  Employee,
  DivisionRoleAssignment,
  BookingRequest,
  EmployeeBookingReservation,
  CreateBookingRequestInput,
} from '../types';
import { apiClient } from '../services/apiClient';
import {
  getBookings,
  createBooking as createBookingService,
  submitBooking as submitBookingService,
  reviewBookingItem as reviewItemService,
  cancelBooking as cancelBookingService,
  isBookingAccessible,
  canUserReviewDivision,
  canUserManageDivision,
  getDatesBetween,
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
  isLoading: boolean;
  login: (userId: number) => void;
  logout: () => void;
  getAuthMe: () => Promise<any>;
  refreshBookings: () => Promise<void>;
  toggleDirectReservation: (
    employeeCode: string,
    date: string,
    missionNote?: string
  ) => { added: boolean; reservation?: EmployeeBookingReservation };
  createBooking: (input: CreateBookingRequestInput) => Promise<BookingRequest>;
  submitBooking: (bookingId: number) => Promise<void>;
  reviewItem: (itemId: number, action: 'ACCEPT' | 'REJECT', note: string) => Promise<void>;
  cancelBooking: (bookingId: number) => Promise<void>;
  deleteDraftBooking: (bookingId: number) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  isEmployeeAvailable: (
    employeeCode: string,
    startDate: string,
    endDate?: string | null,
    excludeBookingId?: number
  ) => { available: boolean; conflictDate?: string; missionNote?: string };
  getDivisionById: (id: number) => Division | undefined;
  getEmployeeByCode: (code: string) => Employee | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roleAssignments, setRoleAssignments] = useState<DivisionRoleAssignment[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [reservations, setReservations] = useState<EmployeeBookingReservation[]>([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState<number>(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAuthMe = useCallback(async () => {
    try {
      const response = await apiClient.get('/auth/me');
      const data = response.data;
      if (data?.authenticated && data?.user) {
        const u = data.user;
        const mappedUser: User = {
          id: u.id,
          username: u.username,
          employee_code: u.employee_code || '',
          first_name: u.first_name || u.username,
          position: u.position || '',
          email: u.email || '',
          is_superuser: Boolean(u.is_superuser),
          division_id: u.division?.id ?? u.division_id ?? 1,
          division_code: u.division?.code ?? u.division_code ?? '',
          role: u.role || (u.is_superuser ? 'superuser' : 'division_user'),
          role_label: u.role_label || '',
        };
        setCurrentUser(mappedUser);
        setSelectedDivisionId(mappedUser.division_id);
      }
      return data;
    } catch {
      return { authenticated: false, user: null };
    }
  }, []);

  const refreshBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch bookings from API:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAuthMe();
    refreshBookings();
  }, [getAuthMe, refreshBookings]);

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      setSelectedDivisionId(user.division_id);
    }
  };

  const login = (userId: number) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      handleSetCurrentUser(found);
      setIsLoginModalOpen(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Filter accessible bookings
  const accessibleBookings = useMemo(() => {
    if (!currentUser) return bookings;
    return bookings.filter(b => isBookingAccessible(b, currentUser, roleAssignments));
  }, [bookings, currentUser, roleAssignments]);

  // Count items awaiting currentUser's review
  const pendingReviewCountForMe = useMemo(() => {
    if (!currentUser) return 0;
    return bookings.reduce((total, b) => {
      if (b.status !== 'pending_review') return total;
      const canReview = canUserReviewDivision(currentUser, b.source_division_id, roleAssignments);
      if (!canReview) return total;
      const pendingItems = b.items.filter(i => i.status === 'pending_review').length;
      return total + (pendingItems > 0 ? 1 : 0);
    }, 0);
  }, [bookings, currentUser, roleAssignments]);

  const myDraftsCount = useMemo(() => {
    if (!currentUser) return 0;
    return bookings.filter(b => b.requested_by_id === currentUser.id && b.status === 'draft').length;
  }, [bookings, currentUser]);

  const approvedCount = useMemo(() => {
    return accessibleBookings.filter(
      b => b.status === 'approved' || b.status === 'partially_approved'
    ).length;
  }, [accessibleBookings]);

  const getDivisionById = useCallback(
    (id: number): Division | undefined => {
      return divisions.find(d => d.id === id);
    },
    [divisions]
  );

  const getEmployeeByCode = useCallback(
    (code: string): Employee | undefined => {
      return employees.find(
        e => e.employee_code.toLowerCase() === code.trim().toLowerCase()
      );
    },
    [employees]
  );

  const isEmployeeAvailable = useCallback(
    (
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
            missionNote: conflict.mission_note || 'ติดภารกิจ',
          };
        }
      }
      return { available: true };
    },
    [reservations]
  );

  const toggleDirectReservation = (
    employeeCode: string,
    date: string,
    missionNote?: string
  ): { added: boolean; reservation?: EmployeeBookingReservation } => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      throw new Error('กรุณาเข้าสู่ระบบก่อนทำการจองกำลังพล');
    }

    const employee = employees.find(e => e.employee_code === employeeCode);
    if (!employee) {
      throw new Error('ไม่พบข้อมูลพนักงานที่ระบุ');
    }

    const canManage = canUserManageDivision(currentUser, employee.division_id, roleAssignments);
    if (!canManage) {
      const empDiv = getDivisionById(employee.division_id);
      throw new Error(
        `คุณไม่มีสิทธิ์ในการจองพนักงานของกองงาน ${empDiv?.name || ''}`
      );
    }

    const existingIndex = reservations.findIndex(
      r => r.employee_code === employeeCode && r.booking_date === date
    );

    if (existingIndex >= 0) {
      const newReservations = reservations.filter((_, idx) => idx !== existingIndex);
      setReservations(newReservations);
      return { added: false };
    } else {
      const nextId = reservations.reduce((max, r) => Math.max(max, r.id), 0) + 1;
      const newRes: EmployeeBookingReservation = {
        id: nextId,
        booking_request_id: null,
        booking_request_item_id: null,
        employee_code: employeeCode,
        booking_date: date,
        mission_note: missionNote?.trim() || 'ภารกิจประจำกอง',
        created_at: new Date().toISOString(),
        is_direct_admin_booking: true,
      };
      setReservations(prev => [...prev, newRes]);
      return { added: true, reservation: newRes };
    }
  };

  const createBooking = async (input: CreateBookingRequestInput): Promise<BookingRequest> => {
    const created = await createBookingService(input);
    await refreshBookings();
    return created;
  };

  const submitBooking = async (bookingId: number): Promise<void> => {
    await submitBookingService(bookingId);
    await refreshBookings();
  };

  const reviewItem = async (
    itemId: number,
    action: 'ACCEPT' | 'REJECT',
    note: string
  ): Promise<void> => {
    await reviewItemService(itemId, { action, note });
    await refreshBookings();
  };

  const cancelBooking = async (bookingId: number): Promise<void> => {
    await cancelBookingService(bookingId);
    await refreshBookings();
  };

  const deleteDraftBooking = async (bookingId: number): Promise<void> => {
    await cancelBookingService(bookingId);
    await refreshBookings();
  };

  const resetToDefaults = async (): Promise<void> => {
    await refreshBookings();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: handleSetCurrentUser,
        users,
        divisions,
        employees,
        bookings,
        reservations,
        roleAssignments,
        accessibleBookings,
        pendingReviewCountForMe,
        myDraftsCount,
        approvedCount,
        selectedDivisionId,
        setSelectedDivisionId,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isLoading,
        login,
        logout,
        getAuthMe,
        refreshBookings,
        toggleDirectReservation,
        createBooking,
        submitBooking,
        reviewItem,
        cancelBooking,
        deleteDraftBooking,
        resetToDefaults,
        isEmployeeAvailable,
        getDivisionById,
        getEmployeeByCode,
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
