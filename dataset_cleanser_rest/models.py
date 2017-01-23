from __future__ import unicode_literals

from django.db import models


class Pairs(models.Model):
    par_id = models.AutoField(primary_key=True)
    par_img_catalog = models.ForeignKey('PairImages', on_delete=models.CASCADE, related_name='catalog_images_pairs')
    par_img_outdoor = models.ForeignKey('PairImages', on_delete=models.CASCADE, related_name='outdoor_images_pairs')
    par_is_pair = models.BooleanField(default=True)
    par_negative_pair = models.BooleanField(default=True)


class PairImages(models.Model):
    pim_id = models.AutoField(primary_key=True)
    pim_image = models.ForeignKey('Images', on_delete=models.CASCADE, related_name='pair_images')
    pim_bounding_box = models.ForeignKey('BoundingBoxes',
                                         related_name='bounding_box', blank=True, null=True)


class Images(models.Model):
    img_id = models.AutoField(primary_key=True)
    img_loc = models.CharField(default="", max_length=500)
    img_is_catalog = models.BooleanField(default=True)


class BoundingBoxes(models.Model):
    bbx_id = models.AutoField(primary_key=True)
    bbx_x = models.FloatField(default=0)
    bbx_y = models.FloatField(default=0)
    bbx_height = models.FloatField(default=0)
    bbx_width = models.FloatField(default=0)
    bbx_active = models.BooleanField(default=True)


