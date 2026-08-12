from rest_framework import serializers
from .models import Leave
from employees.models import Employee

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = "__all__"
        read_only_fields = [
            "id",
            "employee",
            "status",
            "created_at",
            "updated_at",
        ]
    
    def validate(self, attrs):
        if attrs["start_date"] > attrs["end_date"]:
            raise serializers.ValidationError(
                "Start date cannot be after end date."
            )
        return attrs