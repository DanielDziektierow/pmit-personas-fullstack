from rest_framework import serializers
from .models import Persona

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id', 'nombre', 'edad']

    def validate_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        return value

    def validate_edad(self, value):
        if value < 0 or value > 120:
            raise serializers.ValidationError("La edad debe estar entre 0 y 120.")
        return value
