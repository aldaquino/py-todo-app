from django.db import models

class Task(models.Model):
    description = models.CharField(max_length=250)
    order = models.IntegerField()
    removed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
