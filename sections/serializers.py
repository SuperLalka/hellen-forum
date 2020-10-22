from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (
    Categories,
    Comments,
    ExtendingUser,
    Sections,
    Subsections,
    Topics,
)


class CategoriesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=100)

    class Meta:
        model = Categories
        fields = '__all__'


class SectionsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=70)
    category_id = serializers.IntegerField()

    class Meta:
        model = Sections
        fields = '__all__'


class SubsectionsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=70)
    section_id = serializers.IntegerField()

    class Meta:
        model = Subsections
        fields = '__all__'


class TopicsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    text = serializers.CharField(max_length=1000, required=False)
    name = serializers.CharField(max_length=70)
    subsection_id = serializers.IntegerField()
    user_id = serializers.IntegerField()

    class Meta:
        model = Topics
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    text = serializers.CharField(max_length=1000, required=False)
    topic_id = serializers.IntegerField()
    user_id = serializers.IntegerField()

    class Meta:
        model = Comments
        fields = '__all__'


class UsersSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    username = serializers.CharField(max_length=150, required=False)
    is_staff = serializers.BooleanField(required=False)
    last_login = serializers.DateTimeField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff', 'last_login']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        extending_user = ExtendingUser.objects.get(user=instance.id)
        representation['avatar'] = ExtendingUserSerializer(extending_user).data['avatar']
        return representation


class ExtendingUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = ExtendingUser
        fields = ['avatar']


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
