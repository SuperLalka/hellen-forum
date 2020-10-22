import factory
from rest_framework.authtoken.models import Token

from . import models


class UsersFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.User

    username = factory.Sequence(lambda n: "User %d" % n)


class TokensFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Token

    key = factory.Sequence(lambda n: "UserToken_%02d" % n)
    user = factory.SubFactory(UsersFactory)


class CategoriesFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Categories

    name = factory.Sequence(lambda n: "Category %d" % n)


class SectionsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Sections

    name = factory.Sequence(lambda n: "Section %d" % n)
    category = factory.SubFactory(CategoriesFactory)


class SubsectionsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Subsections

    name = factory.Sequence(lambda n: "SubSection %d" % n)
    section = factory.SubFactory(SectionsFactory)


class TopicsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Topics

    name = factory.Sequence(lambda n: "Topic %d" % n)
    text = factory.Sequence(lambda n: "topic %d text" % n)
    subsection = factory.SubFactory(SubsectionsFactory)


class CommentsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Comments

    text = factory.Sequence(lambda n: "comment %d text" % n)
    topic = factory.SubFactory(TopicsFactory)
    user = factory.SubFactory(UsersFactory)
