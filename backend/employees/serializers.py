from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
        
    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id = value).exclude(
            pk=self.instance.pk if self.instance else None
        ).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value
    
    def validate_salary(self, value):
        if value <= 0:
            raise serializers.ValidationError("salary must be greater than zero.")
        return value
        