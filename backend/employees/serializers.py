from rest_framework import serializers
from .models import Employee
from accounts.models import User


class EmployeeSerializer(serializers.ModelSerializer):

    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    role = serializers.CharField(
        write_only=True,
        default="EMPLOYEE"
    )

    class Meta:
        model = Employee
        fields = [
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "role",

            "employee_id",
            "department",
            "phone",
            "address",
            "designation",
            "salary",
            "date_of_birth",
            "date_joined",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_employee_id(self, value):
        queryset = Employee.objects.filter(
            employee_id=value
        )

        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():
            raise serializers.ValidationError(
                "Employee ID already exists."
            )

        return value

    def validate_salary(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Salary must be greater than zero."
            )

        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def create(self, validated_data):

        username = validated_data.pop("username")
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        first_name = validated_data.pop("first_name")
        last_name = validated_data.pop("last_name")
        role = validated_data.pop("role", "EMPLOYEE")

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role.upper(),
        )

        employee = Employee.objects.create(
            user=user,
            **validated_data
        )

        return employee