from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from employees.models import Employee
from departments.models import Department
from attendance.models import Attendance
from django.utils import timezone
from leave_management.models import Leave
from payroll.models import Payroll
from django.db.models import Sum

class TotalEmployeesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total = Employee.objects.count()
        
        return Response({
            'total_employees': total
        })
        
class TotalDepartmentsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total = Department.objects.count()
        return Response({
            "total_departments": total
        })
        
class PresentTodayView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        today = timezone.now().date()
        
        total = Attendance.objects.filter(
            date = today,
            status ='Present'
        ).count()
        
        return Response({
            "present_today": total
        })
        
class PendingLeaveView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        total = Leave.objects.filter(
            status = "Pending"
        ).count()
        
        return Response({
            "pending_leaves": total
        })

class PayrollSummaryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total = Payroll.objects.aggregate(
            total_payroll = Sum("net_salary")
        )
        return Response({
            "total_payroll": total["total_payroll"] or 0
        })
    
    
    
    
    
    
    