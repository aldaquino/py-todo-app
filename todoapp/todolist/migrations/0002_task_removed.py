# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-24 04:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='removed',
            field=models.BooleanField(default=False),
        ),
    ]
