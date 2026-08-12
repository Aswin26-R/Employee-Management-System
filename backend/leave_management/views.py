from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from accounts.permissions import IsOwnerOrAdminHR
from .models import Leave
from .serializers import LeaveSerializer
from employees.models import Employee


class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminHR]

    def get_queryset(self):
        user = self.request.user

        if user.role == "ADMIN":
            return Leave.objects.select_related(
                "employee",
                "employee__user"
            )

        elif user.role == "HR":
            return Leave.objects.select_related(
                "employee",
                "employee__user"
            ).filter(
                employee__user__role="EMPLOYEE"
            )

        return Leave.objects.select_related(
            "employee",
            "employee__user"
        ).filter(
            employee__user=user
        )

    def perform_create(self, serializer):
        try:
            employee = Employee.objects.get(user=self.request.user)
        except Employee.DoesNotExist:
            raise ValidationError(
                "No Employee profile is associated with this user"
            )
        serializer.save(employee=employee)

    @action(
        detail=False,
        methods=["get"],
        url_path="balance"
    )
    def balance(self, request):
        return Response({
            "message": "Leave balance endpoint is working"
        })

    @action(
        detail=False,
        methods=["get"],
        url_path="my-leaves"
    )
    def my_leaves(self, request):
        leaves = self.get_queryset()

        serializer = self.get_serializer(
            leaves,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    @action(
        detail=True,
        methods=["patch"],
        url_path="approve"
    )
    def approve(self, request, pk=None):
        leave = self.get_object()
        leave.status = "Approved"
        leave.save(update_fields=["status"])

        return Response(
            self.get_serializer(leave).data,
            status=status.HTTP_200_OK
        )

    @action(
        detail=True,
        methods=["patch"],
        url_path="reject"
    )
    def reject(self, request, pk=None):
        leave = self.get_object()
        leave.status = "Rejected"

        leave.save(update_fields=["status"])

        return Response(
            self.get_serializer(leave).data,
            status=status.HTTP_200_OK
        )