from django.db import models
from rest_framework.authentication import SessionAuthentication

# This is my 'Todo' model where we define each property required for each Todo post

class Todo(models.Model):
    title = models.CharField(max_length=120) #title property will be a short description of the task
    description = models.TextField() #description property will specify any related details, times, and/or important notes
    completed = models.BooleanField(default=False) #completed property will be the status of a task. A task will either be completed or not completed at any time


    def _str_(self):
        return self.title


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening
