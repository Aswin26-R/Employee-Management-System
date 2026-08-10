from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

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
    
    @action(
        detail = False,
        methods=["get"],
        url_path = "my-payroll"
    )
    def my_payroll(self, request):
        payrolls = Payroll.objects.select_related(
            "employee",
            "employee__user"
        ).filter(
            employee__user = request.user
        )

        serializer = self.get_serializer(payrolls, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
    @action(
        detail = False,
        methods=["post"],
        url_path="generate"
    )
    def generate(self, request):
        return Response(
            {
                "message": "Payroll generation endpoint is working"
            },
            status = status.HTTP_200_OK
        )