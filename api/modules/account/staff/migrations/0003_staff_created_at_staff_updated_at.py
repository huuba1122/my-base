# Generated by Django 4.1.5 on 2023-01-27 16:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='staff',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
