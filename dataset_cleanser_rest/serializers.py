from rest_framework import serializers
from dataset_cleanser_rest import models
from django.db import transaction

class ImagesSerializer(serializers.ModelSerializer):
    image_location = serializers.CharField(source='img_loc')

    class Meta:
        model = models.Images
        exclude = ('img_id','img_loc')


class BoundingBoxesSerializers(serializers.ModelSerializer):

    def create(self, validated_data):
        bbox = models.BoundingBoxes.objects.create(**validated_data)
        return bbox

    class Meta:
        model = models.BoundingBoxes
        fields = ('bbx_x', 'bbx_y', 'bbx_height', 'bbx_width', 'bbx_active')




class PairImagesSerializer(serializers.ModelSerializer):
    image_id = serializers.IntegerField(source='pim_id')
    image = ImagesSerializer(read_only=True, many=False, source='pim_image')
    bounding_box = BoundingBoxesSerializers(read_only=False, many=False, source='pim_bounding_box', required=False)

    class Meta:
        model = models.PairImages
        fields = ('image_id', 'image', 'bounding_box')


class PairsSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(source='par_id')
    catalog_image = PairImagesSerializer(source='par_img_catalog')
    outdoor_image = PairImagesSerializer(source='par_img_outdoor')
    is_pair = serializers.BooleanField(source='par_is_pair')

    class Meta:
        model = models.Pairs
        fields = ('id', 'is_pair', 'catalog_image', 'outdoor_image')



class EvaluationSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    evaluation = serializers.BooleanField()
    outdoor_image = PairImagesSerializer()
    catalog_image = PairImagesSerializer()

    @transaction.atomic
    def create(self, validated_data):
        def add_bounding_box(image):
            image_pim_id = image['pim_id']
            try:
                image_pair = models.PairImages.objects.get(pk=image_pim_id)
            except models.PairImages.DoesNotExist:
                raise Exception
            if 'pim_bounding_box' not in image:
                if image_pair.pim_bounding_box is not None:
                    bbox = image_pair.pim_bounding_box
                    image_pair.pim_bounding_box = None
                    bbox.bbx_active = False
                    bbox.save()
                return

            if image_pair.pim_bounding_box is not None:
                bbox = image_pair.pim_bounding_box
                bbox_json = image['pim_bounding_box']
                bbox.bbx_x = bbox_json['bbx_x']
                bbox.bbx_y = bbox_json['bbx_y']
                bbox.bbx_width = bbox_json['bbx_width']
                bbox.bbx_height = bbox_json['bbx_height']
                bbox.bbx_active = True
                bbox.save()
                return
            image_bbox = BoundingBoxesSerializers(data=image['pim_bounding_box'])
            if image_bbox.is_valid(raise_exception=True):
                bbox = image_bbox.create(image_bbox.validated_data)
                bbox.bbx_active = True
                bbox.save()
                image_pair.pim_bounding_box = bbox
                image_pair.save()

        try:
            pair = models.Pairs.objects.get(pk=validated_data['id'])
        except models.Pairs.DoesNotExist:
            raise Exception

        pair.par_is_pair = validated_data['evaluation']
        pair.save()
        outdoor_image = validated_data['outdoor_image']
        catalog_image = validated_data['catalog_image']

        add_bounding_box(outdoor_image)
        add_bounding_box(catalog_image)

        return pair



    class Meta:
        fields = ("id", "evaluation", "outdoor_image", "catalog_image")