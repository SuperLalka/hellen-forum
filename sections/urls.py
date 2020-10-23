from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter

from sections import views


routerAPI = DefaultRouter()
routerAPI.register(r'categories', views.CategoryViewSet)
routerAPI.register(r'sections', views.SectionViewSet)
routerAPI.register(r'subsections', views.SubsectionViewSet)
routerAPI.register(r'topics', views.TopicViewSet)
routerAPI.register(r'comments', views.CommentViewSet)
routerAPI.register(r'sections', views.SectionViewSet)


users = [
    url(r'^authorization$', views.Authorization.as_view()),
    url(r'^deauthorization$', views.deauthorization),
    url(r'^registration$', views.Registration.as_view()),
    url(r'^user/(?P<id>\w+)$', views.UserDetail.as_view(), name='user_detail'),
]

app_name = 'sections'
urlpatterns = [
    url(r'^$', views.index, name='main-page'),
    url(r'^api/', include(routerAPI.urls)),
    url(r'^users/', include(users))
]
