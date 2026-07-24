from django.db import models
from accounts.models import User
from departments.models import Department

class Employee(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name ="employee_profile"
    )
    
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null = True,
        blank=True,
        related_name="employees"
    )
    
    employee_id = models.CharField(max_length=20, unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    designation = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    
    date_of_birth = models.DateField()
    date_joined = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.employee_id 