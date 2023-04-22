from modules.articles.post.helpers.srs import PostSrs, BriefPostSrs
from .consts import PostStatus

class PostUtils:

    @staticmethod
    def create_post(data, user):
        author = user.staff if hasattr(user, 'staff') else None
        serializer = PostSrs(data=data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save(author=author)

        return obj
    
    @staticmethod
    def get_other_posts_by_author(author, origin_post_id):
        posts = author.posts.filter(
                    status=PostStatus.ACTIVATED
                ).exclude(id=origin_post_id)[:5]
        return BriefPostSrs(posts, many=True).data