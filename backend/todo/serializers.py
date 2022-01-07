from rest_framework import serializers
from .models import Todo


# Here we are creating a Todo serializer which is going to convert model instances to JSON so that the frontend can work with the received data
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo # specifies which model the frontend is going to work with
        fields = ('id', 'title', 'description', 'completed') # specifies which fields will be converted to JSON