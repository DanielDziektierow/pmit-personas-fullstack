# 1. Requisitos

- Python 3.11+
- Node.js 18+
- npm o yarn

# 2. Backend (Django REST Framework)

## Activar el entorno virtual
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# o
source venv/bin/activate  # Linux/macOS
```

## Instalar dependencias
```
pip install -r requirements.txt
```

## Migrar base de datos
```
python manage.py migrate
```

## Ejecutar servidor
```
python manage.py runserver
```

## URL base backend: http://127.0.0.1:8000/
### Endpoints:
* GET /api/personas/ → Lista personas
* POST /api/personas/ → Crea persona

    ### Body:
    ```
    { "nombre": "Juan", "edad": 30 }
    ```

# 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```
**URL frontend:** `http://localhost:3000/`

Formulario para agregar personas y listado dinámico.

# 4. Notas

- CORS habilitado para permitir comunicación frontend ↔ backend.

- **Validaciones:**
  - Nombre obligatorio
  - Edad entre 0 y 120

- Manejo básico de errores y mensajes de éxito.

