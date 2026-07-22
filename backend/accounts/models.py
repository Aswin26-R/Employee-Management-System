from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    Role_Choices = (
        ("ADMIN","Admin"),
        ("HR","HR"),
        ("EMPLOYEE","Employee"),
    )
    
    role = models.CharField(
        max_length=20,
        choices=Role_Choices,
        default = "EMPLOYEE",
    )
    
    def __str__(self):
        return self.username