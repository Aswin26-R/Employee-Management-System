from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsOwnerOrAdminHR
from .models import Payroll 
from .serializers import PayrollSerializer

class PayrollViewSet(viewsets.ModelViewSet):
    serializer_class = PayrollSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminHR]
    
    
    def get_queryset(self):
        user = self.request.user
        
        if user.role == "ADMIN":
            return Payroll.objects.select_related(
                "employee","employee__user"
            )
        elif user.role == "HR":
            return Payroll.objects.select_related(
                "employee","employee__user"
            ).filter(
                employee__user__role = "EMPLOYEE"
            )
        
        return Payroll.objects.select_related(
            "employee","employee__user"
        ).filter(
            employee__user=user
        )
