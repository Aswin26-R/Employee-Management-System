from rest_framework import serializers
from .models import Payroll


class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source="employee.user.get_full_name",
        read_only=True
    )
    employee_id = serializers.CharField(
        source="employee.employee_id",
        read_only=True
    )
    department = serializers.CharField(
        source="employee.department.name",
        read_only=True
    )
    designation = serializers.CharField(
        source="employee.designation",
        read_only=True
    )
    date_joined = serializers.DateField(
        source="employee.date_joined",
        read_only=True
    )

    class Meta:
        model = Payroll
        fields = [
            "id",
            "employee",
            "employee_name",
            "employee_id",
            "department",
            "designation",
            "date_joined",
            "basic_salary",
            "hra",
            "allowance",
            "tax",
            "insurance",
            "other_deductions",
            "deductions",
            "net_salary",
            "month",
            "year",
            "pay_date",
            "payment_status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "employee_name",
            "employee_id",
            "department",
            "designation",
            "date_joined",
            "net_salary",
            "created_at",
            "updated_at",
        ]