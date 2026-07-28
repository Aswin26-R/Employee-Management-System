from rest_framework import serializers
from .models import Attendance
from django.utils import timezone

class AttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"
        
    def validate_date(self,value):
        if value > timezone.now().date():
            raise serializers.ValidationError(
                "Attendance cannot be marked for a future date."
            )
        return value
    def validate(self, attrs):
        employee = attrs["employee"]
        date = attrs["date"]
        
        queryset = Attendance.objects.filter(
            employee = employee,
            date = date
        )
        
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
            
        if queryset.exists():
            raise serializers.ValidationError(
                "Attendance already exists for this employee on this date"
            )
            
        return attrs