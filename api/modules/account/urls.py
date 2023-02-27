import os
from django.urls import path, include

app_name = os.getcwd().split(os.sep)[-1]

urlpatterns = (
    path("auth/", include("modules.account.user.urls", namespace="user")),
    path("role/", include("modules.account.role.urls", namespace="role")),
    path("staff/", include("modules.account.staff.urls", namespace="staff")),
)