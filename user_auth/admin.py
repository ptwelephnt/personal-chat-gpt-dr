from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'last_name']
    search_fields = ['email', 'first_name', 'last_name']
    list_filter = ['is_staff']

admin.site.register(CustomUser, CustomUserAdmin)