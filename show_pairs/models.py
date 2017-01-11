from __future__ import unicode_literals

from django.db import models

class ImagePairs(models.Model):
    img_id = models.AutoField(primary_key=True)
    img_catalog_image = models.CharField(default="", max_length=500)
    img_outdoor_image = models.CharField(default="", max_length=500)
    img_is_pair = models.BooleanField(default=False)