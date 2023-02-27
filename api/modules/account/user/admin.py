from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm

# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    list_display = ("username", "email", "phone_number", "is_staff", "is_superuser")
    list_filter = ("is_staff", "is_superuser")
    search_fields = ("username", "email", "phone_number")
    ordering = ("-id",)

    fieldsets = (
        (None, {
            'fields' : ("username", "email", "phone_number", "password"),
        }),
        ("Permissions", {
            "fields" : (
                "is_staff",
                "is_active",
                "is_superuser",
                "groups",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields" : (
                "username",
                "email",
                "phone_number",
                "password1",
                "password2",
                "is_staff",
                "is_active",
            )
        }),
    )

admin.site.register(User, CustomUserAdmin)