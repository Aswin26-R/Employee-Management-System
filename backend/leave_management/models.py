from django.db import models
from employees.models import Employee
# Create your models here.
class Leave(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete = models.CASCADE,
        related_name = "leaves"
    )
    leave_type = models.CharField(max_length=100)
    
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(
        max_length=20,
        default = "Pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.employee.employee_id} - {self.leave_type}"