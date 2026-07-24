from rest_framework import serializers
from .models import Attandance

class AttandanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Attandance
        fields = "__all__"