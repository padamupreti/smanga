from django.db import models

gen_key = lambda _dir: _dir.replace('-', '_')

class Collection(models.Model):
    _id = models.BigAutoField(primary_key=True)
    series = models.CharField(max_length=100)
    collection_type = models.CharField(max_length=10)
    item_num = models.CharField(max_length=10)
    common_img_width = models.PositiveIntegerField()
    img_list = models.JSONField()

    def __str__(self):
        return f'{gen_key(self.series)}_{self.collection_type}_{self.item_num}'
