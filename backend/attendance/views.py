from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.permissions import IsOwnerOrAdminHR
from employees.models import Employee
from .models import Attendance
from .serializers import AttendanceSerializers

from django.utils import timezone


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

        employee = Employee.objects.get(
            user=request.user
        )

        today = timezone.localdate()
        current_time = timezone.localtime().time()

        try:
            attendance = Attendance.objects.get(
                employee=employee,
                date=today
            )

            if attendance.check_in:
                return Response(
                    {
                        "message": "Already checked in today"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            attendance.check_in = current_time
            attendance.status = "Present"
            attendance.save()

        except Attendance.DoesNotExist:

            attendance = Attendance.objects.create(
                employee=employee,
                date=today,
                check_in=current_time,
                status="Present"
            )

        serializer = self.get_serializer(attendance)

        return Response(
            {
                "message": "Check-in successful",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="check-out"
    )
    def check_out(self, request):

        employee = Employee.objects.get(
            user=request.user
        )

        today = timezone.localdate()

        try:
            attendance = Attendance.objects.get(
                employee=employee,
                date=today
            )

        except Attendance.DoesNotExist:

            return Response(
                {
                    "message": "Please check in first"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not attendance.check_in:

            return Response(
                {
                    "message": "Please check in first"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if attendance.check_out:

            return Response(
                {
                    "message": "Already checked out today"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        attendance.check_out = timezone.localtime().time()
        attendance.save()

        serializer = self.get_serializer(attendance)

        return Response(
            {
                "message": "Check-out successful",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )