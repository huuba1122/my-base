# Generated by Django 4.1.5 on 2023-02-13 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('post', '0001_initial'),
        ('attachment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='article',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='post.post'),
        ),
    ]
