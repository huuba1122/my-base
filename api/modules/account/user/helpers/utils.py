from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from services.helpers.utils import Utils
from .srs import UserSr

User = get_user_model()

class UserUtils:

    @staticmethod
    def get_user_by_username(username):
        if not username:
            return None
        try:
            return User.objects.get(email=username)
        except User.DoesNotExist:
            return None
    
    @staticmethod
    def create_user(data):
        if not data.get("password"):
            data["password"] = Utils.get_random_string(8)
        sr = UserSr(data=data)
        sr.is_valid(raise_exception=True)
        user = sr.save()

        return user

    @staticmethod
    def update_user(user, data):
        user = user
        sr = UserSr(user, data=data, partial=True)
        sr.is_valid(raise_exception=True)
        user = sr.save()

        return user
    
    @staticmethod
    def get_grouped_permission(user):
        ignore_permission_groups = [
            "logentry",
            "permission",
            "contenttype",
            "token",
            "tokenproxy",
            "session",
            "user",
            "whitelisttarget",
            "verif",
            "veriflog",
        ]
        group_ids = user.groups.values_list("id", flat=True)
        queryset = Permission.objects.all()
        if user.is_staff:
            queryset = Permission.objects.filter(group__in=group_ids).distinct()
        list_item = queryset.values_list("codename", flat=True)
        result = {}
        for item in list_item:
            group = item.split("_")[-1]
            permission = item[: -len(group) - 1]
            if group not in ignore_permission_groups:
                result[group] = result.get(group, []) + [permission]
        return result
