export const ROLES = {
  ADMIN: "Admin",
  HR: "HR",
  EMPLOYEE: "Employee",
};

export const ATTENDANCE_STATUS = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  HALF_DAY: "Half Day",
  ON_LEAVE: "On Leave",
};

export const LEAVE_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const LEAVE_TYPES = [
  "Casual Leave",
  "Sick Leave",
  "Paid Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Unpaid Leave",
];

export const PAYROLL_STATUS = {
  PAID: "Paid",
  PENDING: "Pending",
  PROCESSING: "Processing",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";