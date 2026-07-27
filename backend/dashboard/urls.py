from django.urls import path
from .views import (
    TotalEmployeesView,
    TotalDepartmentsView,
    PresentTodayView,
    PendingLeaveView,
    PayrollSummaryView,
    )

urlpatterns = [
    path("total-employees/",
         TotalEmployeesView.as_view(),
         name="total-employees"),
    
    path("total-departments/",
         TotalDepartmentsView.as_view(),
         name="total-departments"),
    
    path("present-today/",
         PresentTodayView.as_view(),
         name="present-today"),
    
    path("pending-leaves/",
         PendingLeaveView.as_view(),
         name ="pending-leaves"),
    
    path("payroll-summary/",
         PayrollSummaryView.as_view(),
         name = "payroll_summary,"),
]
