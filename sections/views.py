from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import filters, generics, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Categories, Sections, Subsections, Topics, Comments
from .serializers import (
    CategoriesSerializer,
    SectionsSerializer,
    SubsectionsSerializer,
    TopicsSerializer,
    CommentsSerializer,
    UsersSerializer,
    RegistrationSerializer
)


def index(request):
    return render(request, 'index.html')


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    lookup_field = 'id'


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    filterset_fields = ['category_id']
    lookup_field = 'id'


class SubsectionViewSet(viewsets.ModelViewSet):
    queryset = Subsections.objects.all()
    serializer_class = SubsectionsSerializer
    filterset_fields = ['section_id']
    lookup_field = 'id'


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topics.objects.all()
    serializer_class = TopicsSerializer
    filterset_fields = ['subsection_id']
    lookup_field = 'id'


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    filterset_fields = ['topic_id']
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    lookup_field = 'id'


class Authorization(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'username': user.username,
            'user_id': user.id,
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deauthorization(request):
    key = request.headers['Authorization'].split(' ')[1]
    Token.objects.get(key=key).delete()
    return Response(status=204)


class Registration(APIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = serializer.instance
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'username': user.username,
            'user_id': user.id,
        }, status=201)
