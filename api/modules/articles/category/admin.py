from django.contrib import admin

from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_menu', 'is_single', 'slug',)
    search_fields = ('tile',)
    list_filter = ('is_menu', 'is_single',)
