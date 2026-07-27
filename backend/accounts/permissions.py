from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "ADMIN"
    
class IsHR(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "HR"
    
class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return  request.user.is_authenticated and request.user.role == "EMPLOYEE"
    
class IsAdminOrHR(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ["ADMIN","HR"]
    
class IsOwnerOrAdminHR(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role in ["ADMIN","HR"]:
            return True
        
        #employee model
        if hasattr(obj, "user"):
            return obj.user == request.user
        
        #attendance,leave,payroll models
        if hasattr(obj,"employee"):
            return obj.employee.user == request.user
        
        return False