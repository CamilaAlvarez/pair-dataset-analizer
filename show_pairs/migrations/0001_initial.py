# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-01-11 13:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImagePairs',
            fields=[
                ('img_id', models.AutoField(primary_key=True, serialize=False)),
                ('img_catalog_image', models.CharField(default='', max_length=500)),
                ('img_outdoor_image', models.CharField(default='', max_length=500)),
                ('img_is_pair', models.BooleanField(default=False)),
            ],
        ),
    ]
