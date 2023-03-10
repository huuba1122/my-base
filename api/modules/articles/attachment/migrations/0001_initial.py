# Generated by Django 4.1.5 on 2023-02-13 15:58

from django.db import migrations, models
import modules.articles.attachment.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(blank=True, default='', max_length=128)),
                ('file', models.FileField(upload_to=modules.articles.attachment.models.file_dest)),
                ('post_uid', models.CharField(blank=True, default='', max_length=128)),
            ],
            options={
                'db_table': 'attachments',
                'ordering': ['-id'],
            },
        ),
    ]
