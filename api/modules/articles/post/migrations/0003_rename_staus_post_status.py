# Generated by Django 4.1.5 on 2023-02-13 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_rename_baner_post_banner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='staus',
            new_name='status',
        ),
    ]