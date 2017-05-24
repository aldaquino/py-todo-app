import todolist

from django.conf.urls import url
from . import views as views

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^', views.index),
]
