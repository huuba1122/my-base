# Generated by Django 4.1.5 on 2023-02-13 15:58

from django.db import migrations, models
import django.db.models.deletion
import modules.articles.post.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
        ('staff', '0003_staff_created_at_staff_updated_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('uid', models.CharField(max_length=128, unique=True)),
                ('title', models.CharField(max_length=256)),
                ('baner', models.ImageField(blank=True, null=True, upload_to=modules.articles.post.models.img_dest)),
                ('body', models.TextField()),
                ('description', models.TextField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('on_menu', models.BooleanField(default=False)),
                ('staus', models.IntegerField(blank=True, choices=[(1, 'deactivated'), (2, 'pending'), (3, 'activated')], default=2)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posts', to='staff.staff')),
                ('categories', models.ManyToManyField(related_name='posts', to='category.category')),
            ],
            options={
                'db_table': 'posts',
                'ordering': ['-id'],
            },
        ),
    ]
