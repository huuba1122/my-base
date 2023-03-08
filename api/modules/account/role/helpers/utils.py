from django.contrib.auth.models import Permission,  Group
from services.helpers.utils import Utils
from .srs import RoleSr

class RoleUtils:
    @staticmethod
    def all_permissions():
        permissions = Permission.objects.exclude(
            content_type__model__in=[
                "logentry",
                "token",
                "session",
                "contenttype",
                "user",
                "permission",
                "veriflog",
                "verif",
                "whitelisttarget",
                "tokenproxy",
                "device",
                "notification",
                "quotavaluelog",
            ]
        ).order_by("content_type__model")
        return [
            Utils.get_transfer_data_source(pem.pk, pem.content_type.model, pem.name)
            for pem in permissions
        ]

    @staticmethod
    def group_content_type(permissions):
        result: dict = {}
        for pem in permissions:
            short_pem = {
                "id": pem["id"],
                "title": pem["title"],
            }
            content_type = str(pem["type"])
            if content_type not in result:
                result[content_type] = [short_pem]
            else:
                result[content_type].append(short_pem)
        return result

    @staticmethod
    def get_list_group():
        groups = RoleSr(Group.objects.all(), many=True).data
        return [{"value": group["id"], "label": group["name"]} for group in groups]
