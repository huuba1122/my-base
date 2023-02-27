from django.contrib import admin

from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}

    list_display = ('id', 'title', 'on_menu', 'slug', 'description',)
    search_fields = ('tile',)
    list_filter = ('author', 'on_menu',)

