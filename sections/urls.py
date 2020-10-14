from django.conf.urls import url
from django.urls import include, path

from sections import views


operations = [
    url(r'^categories$', views.CategoriesList.as_view(), name='categories_list'),
    url(r'^category/(?P<id>\w+)$', views.CategoryDetail.as_view(), name='category_detail'),
    url(r'^sections', views.SectionsList.as_view(), name='sections_list'),
    url(r'^section/(?P<id>\w+)$', views.SectionDetail.as_view(), name='section_detail'),
    url(r'^subsections', views.SubsectionsList.as_view(), name='subsections_list'),
    url(r'^subsection/(?P<id>\w+)$', views.SubsectionDetail.as_view(), name='subsection_detail'),
    url(r'^topics', views.TopicsList.as_view(), name='topics_list'),
    url(r'^topic/(?P<id>\w+)$', views.TopicDetail.as_view(), name='topic_detail'),
    url(r'^comments', views.CommentsList.as_view(), name='comments_list'),
    url(r'^comment/(?P<id>\w+)$', views.CommentDetail.as_view(), name='comment_detail'),
]

app_name = 'sections'
urlpatterns = [
    url(r'^$', views.index, name='main-page'),
    url(r'^api/', include(operations))
]
