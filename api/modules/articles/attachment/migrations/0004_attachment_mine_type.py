# Generated by Django 4.1.5 on 2023-02-13 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attachment', '0003_rename_article_attachment_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='mine_type',
            field=models.CharField(blank=True, default='', max_length=64),
        ),
    ]
