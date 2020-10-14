from django.shortcuts import render
from rest_framework import filters, generics

from .models import Categories, Sections, Subsections, Topics, Comments
from .serializers import (
    CategoriesSerializer,
    SectionsSerializer,
    SubsectionsSerializer,
    TopicsSerializer,
    CommentsSerializer
)


def index(request, **kwargs):
    return render(request, 'index.html')


class CategoriesList(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    authentication_classes, permission_classes = [], []


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    lookup_field = 'id'
    authentication_classes, permission_classes = [], []


class SectionsList(generics.ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    authentication_classes, permission_classes = [], []
    filterset_fields = ['category_id']


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    lookup_field = 'id'
    authentication_classes, permission_classes = [], []


class SubsectionsList(generics.ListCreateAPIView):
    queryset = Subsections.objects.all()
    serializer_class = SubsectionsSerializer
    authentication_classes, permission_classes = [], []
    filterset_fields = ['section_id']


class SubsectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subsections.objects.all()
    serializer_class = SubsectionsSerializer
    lookup_field = 'id'
    authentication_classes, permission_classes = [], []


class TopicsList(generics.ListCreateAPIView):
    queryset = Topics.objects.all()
    serializer_class = TopicsSerializer
    authentication_classes, permission_classes = [], []
    filterset_fields = ['subsection_id']


class TopicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topics.objects.all()
    serializer_class = TopicsSerializer
    lookup_field = 'id'
    authentication_classes, permission_classes = [], []


class CommentsList(generics.ListCreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    authentication_classes, permission_classes = [], []
    filterset_fields = ['topic_id']


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    lookup_field = 'id'
    authentication_classes, permission_classes = [], []
