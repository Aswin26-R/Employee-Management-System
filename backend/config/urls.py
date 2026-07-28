from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import(
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/',include('accounts.urls')),
    path('api/departments/',include("departments.urls")),
    path('api/employees/',include('employees.urls')),
    path('api/attendance/', include('attendance.urls')),
    path('api/leave/',include("leave_management.urls")),
    path('api/payroll/',include ('payroll.urls')),
    path('api/dashboard/',include("dashboard.urls")),
    
    path('api/token/',TokenObtainPairView.as_view(),name = "token_obtain_pair"),
    path('api/token/refresh/',TokenRefreshView.as_view(), name = "token_refresh"),
    
    path("api/schema/",SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/",SpectacularSwaggerView.as_view(url_name = "schema"),
         name = "swagger-ui",),
    path("api/redoc/",SpectacularRedocView.as_view(url_name ="schema"),
         name="redoc",),
]
