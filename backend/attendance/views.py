from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrAdminHR
from .models import Attendance
from .serializers import AttendanceSerializers


class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializers
    permission_classes = [IsAuthenticated,IsOwnerOrAdminHR]
    
    def get_queryset(self):
        user = self.request.user
        
        #admin -> all
        if user.role == "ADMIN":
            return Attendance.objects.select_related(
                "employee",
                "employee__user"
            )
            
        # hr -> all employee
        elif user.role == "HR":
            return Attendance.objects.select_related(
                "employee",
                "employee__user"
            ).filter(
                employee__user__role ="EMPLOYEE"
            )
        
        #employee -> only their ownattendance
        return Attendance.objects.select_related(
            "employee",
            "employee__user"
        ).filter(
            employee__user = user
        )
            
            
    
    