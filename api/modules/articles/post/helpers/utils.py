from modules.articles.post.helpers.srs import PostSrs

class PostUtils:

    @staticmethod
    def create_post(data, user):
        author = user.staff if hasattr(user, 'staff') else None
        serializer = PostSrs(data=data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save(author=author)

        return obj
