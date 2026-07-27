from django.db import models
from employees.models import Employee

class Payroll(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="payrolls"
    )
    
    basic_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    
    bonus = models.DecimalField(
        max_digits =10,
        decimal_places=2,
        default =0 
    )
    
    deductions = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default = 0
    )
    
    net_salary = models.DecimalField(
        max_digits = 10,
        decimal_places=2,
        editable=False
    )
    
    
    pay_month = models.CharField(max_length=20)
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def save(self,*args,**kwargs):
        self.net_salary = (
            self.basic_salary +
            self.bonus -
            self.deductions
        )
        super().save(*args,**kwargs)
        
    def __str__(self):
        return f"{self.employee.employee_id} - {self.pay_month}"