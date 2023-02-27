# Generated by Django 4.1.5 on 2023-02-13 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=128, unique=True)),
                ('is_menu', models.BooleanField(default=False)),
                ('is_single', models.BooleanField(default=True)),
                ('slug', models.SlugField(max_length=128)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_categories', to='category.category')),
            ],
            options={
                'db_table': 'categories',
                'ordering': ['-id'],
            },
        ),
    ]