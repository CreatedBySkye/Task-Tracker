from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# This is our TodoView class 
# The viewsets base class provides the implementation for CRUD operations by default
class TodoView(viewsets.ModelViewSet): # Here we are specifying the serializer class and the queryset
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()