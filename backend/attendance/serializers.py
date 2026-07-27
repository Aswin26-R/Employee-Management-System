from rest_framework import serializers
from .models import Attendance

class AttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"