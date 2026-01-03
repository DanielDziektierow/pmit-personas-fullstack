from django.urls import path
from .views import PersonaListCreateView

urlpatterns = [
    path('personas/', PersonaListCreateView.as_view(), name='personas'),
]
