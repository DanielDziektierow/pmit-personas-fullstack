from django.db import models

class Persona(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.nombre} ({self.edad})"
