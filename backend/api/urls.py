from django.urls import path
from .views import OrderViewSet
from rest_framework.routers import DefaultRouter
from . import views

from .views import (
    ProductListCreateView, ProductDetailView,
    OrderListCreateView, OrderDetailView
)


router = DefaultRouter()
router.register(r'orders', OrderViewSet)



urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:order_id>/products/', views.add_product_to_order, name='add-product-to-order'),
]

