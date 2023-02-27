from rest_framework.permissions import BasePermission


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        action = view.action
        name = getattr(view, '_name')

        if request.user.is_staff is True:
            return True
        
        if not action or not name:
            return False

        alias = {
            "view": ["list", "retrieve"],
            "delete": ["delete", "delete_list"],
            "add": [],
            "change": [],
        }

        custom_alias = getattr(
            view,
            "_permission_alias",
            {},    
        )

        for key in custom_alias:
            value = custom_alias[key]
            alias[key] = alias[key] + value if value in alias else value
        
        for main_action, value_list in alias.items():
            if action in value_list:
                action = main_action
                break
        
        name = "group" if name == "role" else name
        
        permission = f"{action}_{name}"

        is_allow = False

        if request.user.user_permissions.filter(codename=permission).count():
            is_allow = True
        
        if request.user.groups.filter(permissions__codename=permission).count():
            is_allow = True
        
        return is_allow