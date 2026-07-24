from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Attandance
from .serializers import AttandanceSerializers

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attandance.objects.all()
    serializer_class = AttandanceSerializers
    permission_classes = [IsAuthenticated]