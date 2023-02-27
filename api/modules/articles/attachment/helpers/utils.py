from modules.articles.attachment.models import Attachment

class AttachmentUtils:
    @staticmethod
    def update_title(obj, title):
        if not obj.title:
            obj.title = title
            obj.save()
        return obj
    

    @staticmethod
    def update_post_uid(post):
        attachments = Attachment.objects.filter(post_uid=post.uid).update(post=post)
        return attachments
        
            
