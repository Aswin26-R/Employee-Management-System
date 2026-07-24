from django.db import models
from employees.models import Employee

# Create your models here.

class Attandance(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name = "attendance"
    )
    date = models.DateField()
    
    check_in = models.TimeField()
    
    check_out = models.TimeField(
        null = True,
        blank = True
    )
    
    status = models.CharField(
        max_length=20,
        choices=[
            ("Present","Present"),
            ("Absent","Absent"),
            ("Leave","Leave"),
        ],
        default = "Present"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.employee.employee_id} - {self.date}"