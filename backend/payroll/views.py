from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from accounts.permissions import IsOwnerOrAdminHR
from employees.models import Employee
from .models import Payroll
from .serializers import PayrollSerializer


class PayrollViewSet(viewsets.ModelViewSet):

    serializer_class = PayrollSerializer
    permission_classes = [
        IsAuthenticated,
        IsOwnerOrAdminHR
    ]

    def get_queryset(self):

        user = self.request.user

        # ADMIN → all payrolls
        if user.role == "ADMIN":
            return Payroll.objects.select_related(
                "employee",
                "employee__user",
                "employee__department"
            )

        # HR → employee payrolls
        elif user.role == "HR":
            return Payroll.objects.select_related(
                "employee",
                "employee__user",
                "employee__department"
            ).filter(
                employee__user__role="EMPLOYEE"
            )

        # EMPLOYEE → only own payroll
        return Payroll.objects.select_related(
            "employee",
            "employee__user",
            "employee__department"
        ).filter(
            employee__user=user
        )

    @action(
        detail=False,
        methods=["get"],
        url_path="my-payroll"
    )
    def my_payroll(self, request):

        payrolls = Payroll.objects.select_related(
            "employee",
            "employee__user",
            "employee__department"
        ).filter(
            employee__user=request.user
        ).order_by("-created_at")

        serializer = self.get_serializer(
            payrolls,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="generate"
    )
    def generate(self, request):
        month = request.data.get("month")
        year = request.data.get("year")
        
        if not month or not year:
            return Response(
                {"error": "Month and year are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        employees = Employee.objects.filter(
            user__role="EMPLOYEE"
        )
        
        created_count = 0
        for employee in employees:
            Payroll.objects.update_or_create(
                employee=employee,
                month=month,
                year=year,
                defaults={
                    "basic_salary": employee.salary,
                    "hra": 0,
                    "allowance": 0,
                    "tax": 0,
                    "insurance": 0,
                    "other_deductions": 0,
                    "pay_date": timezone.localdate(),
                    "payment_status": "Paid",
                }
            )
            created_count += 1
        
        return Response({
            "message": "Payroll generated successfully",
            "employees_processed": created_count
        })