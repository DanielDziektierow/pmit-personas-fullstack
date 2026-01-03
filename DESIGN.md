# DESIGN.md

## 1. Supuestos

- El sistema no requiere autenticación ni autorización en esta etapa.
- El alcance se limita a registrar y listar personas.
- El nombre es obligatorio y no necesariamente único.
- La edad debe ser un número entero entre 0 y 120.
- No se contempla edición ni eliminación de personas.
- Se asume un volumen bajo de datos (sin paginación por ahora).
- El sistema está pensado como base para escalar a módulos más complejos (por ejemplo, gestión de trámites).

## 2. Modelo de Datos

### Persona

| Campo  | Tipo    | Descripción                     |
|--------|---------|---------------------------------|
| id     | Integer | Identificador único (PK)       |
| nombre | String  | Nombre de la persona (requerido) |
| edad   | Integer | Edad (0–120)                   |

- La persistencia se realiza utilizando SQLite por simplicidad y facilidad de ejecución local.

## 3. Contratos de API

### POST /api/personas/

Registra una nueva persona.

**Request**

```json
{
  "nombre": "Juan",
  "edad": 30
}
```

**Response – 201 Created**

```json
{
  "id": 1,
  "nombre": "Juan",
  "edad": 30
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
    "nombre": "Juan",
    "edad": 30
  }
]
```

## 4. Decisiones Técnicas

- **Backend:** Django + Django REST Framework  
  Se eligió por su ORM maduro, sistema de validaciones integrado y estructura estándar, lo que facilita escalar el proyecto a módulos más complejos sin necesidad de reestructurar la base.

- **Arquitectura:**  
  Separación clara entre modelos, serializers y vistas, siguiendo las buenas prácticas de DRF.

- **Persistencia:**  
  SQLite, por ser liviano y suficiente para el alcance del challenge.

- **Validaciones:**  
  Implementadas en los serializers para mantener las reglas de negocio centralizadas.

## 5. Manejo de Errores

- Uso de códigos HTTP estándar.
- Respuestas consistentes proporcionadas por Django REST Framework.
- Mensajes de error claros y orientados al consumidor de la API.

## 6. Trade-offs y Futuras Mejoras

Por limitaciones de tiempo y alcance, se dejaron fuera:

- Autenticación y autorización.
- Paginación y filtros.
- Tests automáticos más exhaustivos.
- Deploy productivo con configuración de seguridad completa.

En un entorno de producción se agregarían:

- Paginación y ordenamiento.
- Tests unitarios y de integración.
- Autenticación (JWT u OAuth).
- Base de datos PostgreSQL.
- Configuración de CORS y seguridad.

## 7. Conclusión

La solución prioriza claridad, simplicidad y extensibilidad, cumpliendo con los requisitos funcionales actuales y dejando una base sólida para futuras ampliaciones del sistema.
