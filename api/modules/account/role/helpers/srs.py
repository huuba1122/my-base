from django.contrib.auth.models import Group as Role

# lib
from rest_framework.serializers import ModelSerializer, CharField
from rest_framework.validators import UniqueValidator



class RoleSr(ModelSerializer):
    class Meta:
        model = Role
        exclude = ()
        read_only_fields = ("id",)
    

    name = CharField(
        max_length=64,
        validators=[
            UniqueValidator(
                queryset= Role.objects.all(),
                message="Duplicate role"
            )
        ]
    )