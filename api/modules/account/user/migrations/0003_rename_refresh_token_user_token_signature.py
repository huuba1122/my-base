# Generated by Django 4.1.5 on 2023-02-01 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_refresh_token'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='refresh_token',
            new_name='token_signature',
        ),
    ]
