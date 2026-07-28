from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrAdminHR
from .models import Leave
from .serializers import LeaveSerializer


class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrAdminHR]
    
    def get_queryset(self):
        user = self.request.user
    
        if user.role == "ADMIN":
            return Leave.objects.select_related(
                "employee",
                "employee__user"
            )
        
        elif user.role == "HR":
            return Leave.objects.select_related(
                "employee",
                "employee__user"
            ).filter(employee__user = user)
