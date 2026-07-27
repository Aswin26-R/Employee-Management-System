from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# Create your views here.

from .models import Employee
from .serializers import EmployeeSerializer
from accounts.permissions import *

class EmployeesViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrAdminHR]
    
    def get_queryset(self):
        user = self.request.user
        
        #admin -> all records
        if user.role == "ADMIN":
            return Employee.objects.select_related("user","department").all()
        
        #hr -> only employee
        elif user.role == "HR":
            return Employee.objects.select_related("user","department").filter(user__role = "EMPLOYEE")
        
        return Employee.objects.select_related("user","department").filter(user = user)
        
        
