from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Order(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product, related_name='orders')  # <-- M2M field

    def __str__(self):
        return f"Order #{self.id} on {self.date.strftime('%Y-%m-%d')}"

