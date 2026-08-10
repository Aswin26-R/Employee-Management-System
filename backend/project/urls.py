from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from employees.views import EmployeesViewSet
from departments.views import DepartmentViewSet
from attendance.views import AttendanceViewSet
from leave_management.views import LeaveViewSet
from payroll.views import PayrollViewSet


router = DefaultRouter()

router.register(
    r'employees',
    EmployeesViewSet,
    basename='employees'
)

router.register(
    r'departments',
    DepartmentViewSet,
    basename='departments'
)

router.register(
    r'attendance',
    AttendanceViewSet,
    basename='attendance'
)

router.register(
    r'leave',
    LeaveViewSet,
    basename='leave'
)

router.register(
    r'payroll',
    PayrollViewSet,
    basename='payroll'
)


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),

    path('api/accounts/', include('accounts.urls')),
]