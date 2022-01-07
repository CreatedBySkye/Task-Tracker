from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views


# The router class allows us to make the following queries:
router = routers.DefaultRouter()

router.register(r'todos', views.TodoView, 'todo') # /todos/ returns a list of all the Todo items

# /todos/id returns a single Todo item using the id primary key
# this is where UPDATE and DELETE actions are going to take place

# This is the final step that completes the building of the API
urlpatterns = [
    path('admin/', admin.site.urls), # This code specifies the URL path for the admin page
    path('api/', include(router.urls)), # This code specifies the URL path for the API
]

# Now we will be able to perform crud operations on the Todo model. 