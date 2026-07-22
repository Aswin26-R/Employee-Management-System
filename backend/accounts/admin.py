from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "role",
        "is_staff",
        "is_active",
    )
    
    list_filter= (
        "role",
        "is_staff",
        "is_active",
    )
    
    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields":("role",),}),
    )
    
    search_fields =(
        'username',
        "email",
    )
    
    ordering = ("id",)