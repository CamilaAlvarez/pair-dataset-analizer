# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-01-12 19:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('show_pairs', '0002_auto_20170112_1856'),
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
        migrations.RemoveField(
            model_name='evaluations',
            name='evl_pair',
        ),
        migrations.RemoveField(
            model_name='pairimages',
            name='pim_image',
        ),
        migrations.RemoveField(
            model_name='pairimages',
            name='pip_bounding_box',
        ),
        migrations.RemoveField(
            model_name='pairs',
            name='par_img_catalog',
        ),
        migrations.RemoveField(
            model_name='pairs',
            name='par_img_outdoor',
        ),
        migrations.DeleteModel(
            name='BoundingBoxes',
        ),
        migrations.DeleteModel(
            name='Evaluations',
        ),
        migrations.DeleteModel(
            name='Images',
        ),
        migrations.DeleteModel(
            name='PairImages',
        ),
        migrations.DeleteModel(
            name='Pairs',
        ),
    ]