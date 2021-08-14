"""reader URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include

from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'[a-z\-]+/chapters/', TemplateView.as_view(template_name='index.html')),
    re_path(r'[a-z\-]+/volumes/', TemplateView.as_view(template_name='index.html')),
    re_path(r'[a-z\-]+/chapters/[0-9\.]+/', TemplateView.as_view(template_name='index.html')),
    re_path(r'[a-z\-]+/volumes/[0-9\.]+/', TemplateView.as_view(template_name='index.html')),
]
