from rest_framework import generics
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


# List all products or create a new product
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Retrieve, update or delete a single product by id
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# List all orders or create a new order
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# Retrieve, update or delete a single order by id
class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer



class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail=True, methods=['delete'], url_path='products/(?P<product_id>[^/.]+)')
    def remove_product(self, request, pk=None, product_id=None):
        try:
            order = self.get_object()
            product = Product.objects.get(pk=product_id)
            order.products.remove(product)
            return Response({'detail': 'Product removed from order.'}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def add_product_to_order(request, order_id):
    try:
        order = Order.objects.get(pk=order_id)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    product_id = request.data.get('product_id')
    if not product_id:
        return Response({'error': 'Product ID is required'}, status=400)

    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    # Add product to order (adjust this logic to your model relationships)
    order.products.add(product)
    order.save()

    return Response({'message': 'Product added to order successfully'})

        
