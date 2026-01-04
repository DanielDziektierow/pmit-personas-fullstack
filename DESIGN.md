# DESIGN.md

## 1. Supuestos

- El sistema no requiere autenticación ni autorización en esta etapa.
- El alcance se limita a registrar y listar personas.
- El nombre es obligatorio y no necesariamente único.
- La edad debe ser un número entero entre 0 y 120.
- No se contempla edición ni eliminación de personas.
- Se asume un volumen bajo de datos (sin paginación por ahora).
- El sistema está pensado como base para escalar a módulos más complejos (por ejemplo, gestión de trámites).
- El proyecto puede ejecutarse con Docker para asegurar entorno consistente.

## 2. Modelo de Datos

### Persona

| Campo  | Tipo    | Descripción                     |
|--------|---------|---------------------------------|
| id     | Integer | Identificador único (PK)       |
| nombre | String  | Nombre de la persona (requerido) |
| edad   | Integer | Edad (0–120)                   |

- Persistencia: SQLite por simplicidad y facilidad de ejecución local.
- Escalabilidad futura: Persona podría relacionarse con módulos como trámites o documentos usando ForeignKey.

## 3. Contratos de API

Todos los endpoints empiezan con `/api/`.

### POST /api/personas/

Registra una nueva persona.

**Request**

```json
{
  "nombre": "daniel",
  "edad": 29
}

**Response – 201 Created**

```json
{
  "id": 1,
  "nombre": "daniel",
  "edad": 29
}
```

## Errores

- `400 Bad Request` → Validaciones de negocio (edad fuera de rango, nombre vacío).
- `422 Unprocessable Entity` → Estructura de datos inválida.

## GET /api/personas/

Lista todas las personas registradas.

**Response – 200 OK**

```json
[
  {
    "id": 1,
    "nombre": "daniel",
    "edad": 29
  }
]
```

## 4. Decisiones Técnicas

**Backend:** Django + Django REST Framework  
- ORM maduro, validaciones integradas, estructura estándar.  

**Arquitectura:**  
- Separación clara entre modelos, serializers y vistas.  

**Persistencia:**  
- SQLite, suficiente para el alcance del challenge.  

**Validaciones:**  
- Centralizadas en los serializers.  

**Docker:**  
- Se incluyen Dockerfiles para backend y frontend para facilitar ejecución local y futura integración/producción.  

## 5. Manejo de Errores

- Uso de códigos HTTP estándar (200, 201, 400, 422).  
- Mensajes consistentes y claros, proporcionados por DRF.  
- Validaciones centralizadas en los serializers.  

## 6. Trade-offs y Futuras Mejoras

**Dejados fuera por alcance:**  
- Autenticación y autorización.  
- Paginación y filtros avanzados.  
- Tests automáticos exhaustivos.  
- Deploy productivo con seguridad completa.  

**Si fuera producción, se agregarían:**  
- PostgreSQL en lugar de SQLite.  
- Paginación, ordenamiento y filtros.  
- Autenticación (JWT u OAuth).  
- Tests unitarios e integración.  
- Configuración completa de CORS y seguridad.  

## 7. Conclusión

La solución prioriza claridad, simplicidad y extensibilidad, cumpliendo los requisitos funcionales y dejando una base sólida para futuras ampliaciones.
