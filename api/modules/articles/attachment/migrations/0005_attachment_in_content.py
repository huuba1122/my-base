# Generated by Django 4.1.5 on 2023-02-23 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attachment', '0004_attachment_mine_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='in_content',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
