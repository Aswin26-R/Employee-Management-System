from django.db import models
from django.utils import timezone
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
    hra = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    allowance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    tax = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    insurance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    other_deductions = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    deductions = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    net_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        editable=False
    )
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    pay_date = models.DateField(
        null=True,
        blank=True
    )
    payment_status = models.CharField(
        max_length=20,
        default="Paid"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        self.net_salary = (
            self.basic_salary +
            self.hra +
            self.allowance -
            self.tax -
            self.insurance -
            self.other_deductions -
            self.deductions
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.employee_id} - {self.month} {self.year}"