# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-16 15:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dataset_cleanser', '0001_initial'),
    ]

    operations = [
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