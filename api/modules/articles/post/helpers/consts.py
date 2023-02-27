class PostStatus:
    DEACTIVATED = 1
    PENDING = 2
    ACTIVATED = 3


POST_STATUS_CHOICES = (
    (PostStatus.DEACTIVATED, 'deactivated'),
    (PostStatus.PENDING, 'pending'),
    (PostStatus.ACTIVATED, 'activated'),
)

POST_STATUS_DICT = dict(POST_STATUS_CHOICES)