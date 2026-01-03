from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Persona

class PersonaAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_data = {"nombre": "Juan", "edad": 30}
        self.invalid_data_nombre = {"nombre": "", "edad": 25}
        self.invalid_data_edad = {"nombre": "Ana", "edad": 200}

    def test_crear_persona_valida(self):
        """Crear persona con datos válidos debería funcionar"""
        response = self.client.post("/api/personas/", self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Persona.objects.count(), 1)
        self.assertEqual(Persona.objects.first().nombre, "Juan")

    def test_error_nombre_obligatorio(self):
        """Enviar nombre vacío debe devolver 400"""
        response = self.client.post("/api/personas/", self.invalid_data_nombre, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("nombre", response.data)

    def test_error_edad_fuera_de_rango(self):
        """Enviar edad fuera del rango permitido debe devolver 400"""
        response = self.client.post("/api/personas/", self.invalid_data_edad, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("edad", response.data)
