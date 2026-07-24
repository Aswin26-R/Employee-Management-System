from rest_framework.routers import DefaultRouter
from .views import EmployeesViewSet

router = DefaultRouter()
router.register("", EmployeesViewSet, basename="employee")

urlpatterns = router.urls
