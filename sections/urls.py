from django.urls import include, path

from sections import views


urlpatterns = [
    path('', views.index),
]
