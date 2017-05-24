
import datetime
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
from django.http import HttpResponse
from django.db import models
from todolist.models import Task
from django.core.serializers.json import DjangoJSONEncoder

def index(request):
    """index funcion, for main/welcome page"""
    return render(request, 'base.html', {})

def load(request):
    tsk = Task.objects.values()
    tsk = list(tsk)

    todolist = {'todos': tsk}

    # todolist = {
    #     'todos': [
    #         {'id': 1, 'desc': 'Item 1', 'order': 1, 'done': False},
    #         {'id': 2, 'desc': 'Item 2', 'order': 1, 'done': False},
    #         {'id': 3, 'desc': 'Item 3', 'order': 1, 'done': False},
    #         {'id': 4, 'desc': 'Item 4', 'order': 1, 'done': False},
    #         {'id': 5, 'desc': 'Item 5', 'order': 1, 'done': False},
    #     ]
    # }
    return JsonResponse({'status': 'ok', 'todolist': todolist})


def savenew(request):
    post_data = {}
    if request.method == 'POST':
        post_data = json.loads(request.body.decode('utf-8'))

    # tsk = Task.objects.create(description)
    print(post_data)
    return JsonResponse({'status': 'ok'})



    