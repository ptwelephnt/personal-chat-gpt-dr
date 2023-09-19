import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'personalchatgpt.settings')

celery = Celery('personal_chat_gpt')
celery.config_from_object('django.conf:settings', namespace='CELERY')
celery.autodiscover_tasks()