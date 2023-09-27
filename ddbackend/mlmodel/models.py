from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Bmi(models.Model):
    bmi=models.FloatField()
    health_risk=models.CharField(max_length=100)
    bmi_category=models.CharField(max_length=100)
    precautions = models.TextField()
    probable_diseases=models.TextField()
    def __str__(self):
        return self.bmi_category

class Diabetes(models.Model):
    diabetes_probabilty=models.FloatField()
    health_risk=models.CharField(max_length=100)
    precautions = models.TextField()
    medication = models.TextField()
    def __str__(self):
        return self.health_risk