from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Create your views here.

from .models import Employee
from .serializers import EmployeeSerializer
from accounts.permissions import *

class EmployeesViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrAdminHR]
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    
    filterset_fields = [
        "department",
        "designation",
    ]
    
    search_fields = [
        "employee_id",
        "user__username",
        "designation",
    ]
    
    ordering_fields = [
        "employee_id",
        "salary",
        "date_joined",
    ]
    
    ordering = ["employee_id"]
    
    def get_queryset(self):
        user = self.request.user
        
        #admin -> all records
        if user.role == "ADMIN":
            return Employee.objects.select_related("user","department").all()
        
        #hr -> only employee
        elif user.role == "HR":
            return Employee.objects.select_related("user","department").filter(user__role = "EMPLOYEE")
        
        return Employee.objects.select_related("user","department").filter(user = user)
        
        
