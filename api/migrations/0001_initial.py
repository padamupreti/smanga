# Generated by Django 3.2.3 on 2021-08-28 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('series', models.CharField(max_length=100)),
                ('collection_type', models.CharField(max_length=10)),
                ('item_num', models.CharField(max_length=10)),
                ('common_img_width', models.PositiveIntegerField()),
                ('img_list', models.JSONField()),
            ],
        ),
    ]
