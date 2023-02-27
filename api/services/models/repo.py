import importlib


class Repo:
    STAFF = ("modules.account.staff.models", "Staff")
    VERIF = ("modules.noti.verify.models", "Verify")
    
    POST = ("modules.articles.post.models", "Post")
    CATEGORY = ("modules.articles.category.models", "Category")
    ARTICLE_ATTACHMENT = ("modules.articles.attachment.models", "Attachment")

    @staticmethod
    def load(module_tuple):
        return getattr(importlib.import_module(module_tuple[0]), module_tuple[1])
