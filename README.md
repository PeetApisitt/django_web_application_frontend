# Employee Booking & Allocation System (ระบบจัดสรรและยืมตัวกำลังพล)

A modern, production-ready React application rewritten from the original Django / Django Ninja backend (`PeetApisitt/django_web_application_backend`).

## Core Features & Business Logic Ported

1. **Role-Based Access Control (RBAC)**:
   - **Division Admin (`division_admin`)**: Review and approve/reject personnel requests belonging to their source division.
   - **Division Director (`division_director`)**: View and oversee all incoming/outgoing division bookings.
   - **Division User (`division_user`)**: Create booking drafts, submit requests, and cancel active requests.
   - **Superadmin**: Full visibility and administrative control across all 11 divisions.
   - **Interactive Persona Switcher**: Easily switch roles and test permissions on the fly.

2. **Booking Workflow & State Transitions**:
   - `draft` ➜ `pending_review` (or auto-`approved` for internal requests within same division)
   - Multi-day booking support with atomic date expansion (`getDatesBetween`).
   - Duplicate booking prevention (`EmployeeBookingReservation`) enforcing unique `(employee_code, booking_date)` constraints.
   - Evaluation engine:
     - All personnel accepted ➜ `approved`
     - Mixed accepted/rejected ➜ `partially_approved`
     - All rejected ➜ `rejected` (releasing all date reservations)
   - Rejection requires an explicit reason / review note.
   - Requesters can cancel active requests, immediately releasing personnel availability.

3. **Organizational Data (data.xlsx)**:
   - Full seed dataset of **189 employees** and **11 divisions** (กองกลาง, กองโครงการและงบประมาณ, สำนักนโยบายและแผนกำลังพล, แผนกการเงิน, กองจัดการ, กองปกครอง, กองบริการกำลังพล, กองพัฒนากำลังพล, กองพัฒนาระบบและบริหารทรัพยากรบุคคล, กองเทคโนโลยีดิจิทัล, กองนโยบายและแผน).

4. **Personnel Availability & Conflict Calendar**:
   - Visual inspection of all active reservations per date.
   - Real-time conflict detection before submitting new requests.

5. **Django Ninja API Reference Viewer**:
   - Interactive representation of the original OpenAPI / Swagger endpoints (`/api/bookings/`, submit, review, cancel) with live JSON responses.

## Development & Build

```bash
npm install
npm run dev     # Starts Vite dev server on port 3000
npm run build   # TypeScript compilation & production build
```
