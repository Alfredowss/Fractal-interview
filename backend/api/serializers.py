from rest_framework import serializers
from .models import Order, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'stock']
        # ✅ DO NOT include 'order' — it no longer exists


class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)  # for GET
    product_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Product.objects.all(),
        write_only=True,
        source='products'  # maps to the M2M field
    )

    class Meta:
        model = Order
        fields = ['id', 'date', 'products', 'product_ids']

    def create(self, validated_data):
        products = validated_data.pop('products')
        order = Order.objects.create()
        order.products.set(products)
        return order

