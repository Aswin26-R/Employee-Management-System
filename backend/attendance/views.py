from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.permissions import IsOwnerOrAdminHR
from .models import Attendance
from .serializers import AttendanceSerializers


class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializers
    permission_classes = [IsAuthenticated, IsOwnerOrAdminHR]

    def get_queryset(self):
        user = self.request.user

        # Admin -> all attendance
        if user.role == "ADMIN":
            return Attendance.objects.select_related(
                "employee",
                "employee__user"
            )

        # HR -> all employee attendance
        elif user.role == "HR":
            return Attendance.objects.select_related(
                "employee",
                "employee__user"
            ).filter(
                employee__user__role="EMPLOYEE"
            )

        # Employee -> only own attendance
        return Attendance.objects.select_related(
            "employee",
            "employee__user"
        ).filter(
            employee__user=user
        )

    @action(
        detail=False,
        methods=["get"],
        url_path="my-attendance"
    )
    def my_attendance(self, request):

        attendance = Attendance.objects.filter(
            employee__user=request.user
        )

        serializer = self.get_serializer(
            attendance,
            many=True
        )

        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_path="check-in"
    )
    def check_in(self, request):

        return Response(
            {
                "message": "Check-in successful"
            },
            status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="check-out"
    )
    def check_out(self, request):

        return Response(
            {
                "message": "Check-out successful"
            },
            status=status.HTTP_200_OK
        )