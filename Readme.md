# Proyecto Personas – Fullstack Python/React

## 1. Requisitos

- Python 3.11+
- Node.js 18+
- npm o yarn
- Docker (opcional)

---

## 2. Backend (Django REST Framework)

### Activar el entorno virtual

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

## Actualizar pip
```
python -m pip install --upgrade pip
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
    { "nombre": "daniel", "edad": 29 }
    ```

# 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```
**URL frontend:** `http://localhost:3000/`

Formulario para agregar personas y listado dinámico.

# 4. Ejecutar con Docker (opcional)

- Si querés correr todo con Docker:

```
docker compose up --build
```
* Backend: http://localhost:8000/

* Frontend: http://localhost:3000/

- Manejo básico de errores y mensajes de éxito.

# 5. Notas

- CORS habilitado para comunicación frontend ↔ backend.

- Proyecto listo para tests y CI/CD si se quisiera.

- Estructura pensada para escalabilidad y futura integración de módulos como trámites o documentos.


Autor: Daniel Dziektierow

Repositorio: https://github.com/DanielDziektierow/pmit-personas-fullstack

