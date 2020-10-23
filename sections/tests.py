from django.test import Client, TestCase
from rest_framework.test import APIClient

from . import models
from .factories import (
    CategoriesFactory,
    SectionsFactory,
    SubsectionsFactory,
    TopicsFactory,
    CommentsFactory,
    UsersFactory,
    TokensFactory,
)


class CategoriesApiTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.test_category = CategoriesFactory(name='test')

    def test_get_category(self):
        response = self.client.get(f'/api/category/{self.test_category.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': self.test_category.id, 'name': 'test'})

    def test_get_categories_list(self):
        CategoriesFactory(name='test_2')
        response = self.client.get('/api/categories')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_category(self):
        response = self.client.post('/api/categories', {'name': 'new_test'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"id": 2, "name": "new_test"})

    def test_update_category(self):
        response = self.client.patch(f'/api/category/{self.test_category.id}',
                                     {'id': self.test_category.id, 'name': 'new_name'})
        self.assertEqual(response.status_code, 200)
        self.test_category.refresh_from_db()
        self.assertEqual(self.test_category.name, 'new_name')

    def test_delete_category(self):
        response = self.client.delete(f'/api/category/{self.test_category.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(models.Categories.objects.filter(id=self.test_category.id).exists())


class SectionsApiTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.test_section = SectionsFactory(name='test')
        self.test_categories = CategoriesFactory(name='test')

    def test_get_section(self):
        response = self.client.get(f'/api/section/{self.test_section.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': self.test_section.id,
                                           'name': self.test_section.name,
                                           'category_id': self.test_section.category_id,
                                           'category': self.test_section.category_id})

    def test_get_sections_list(self):
        SectionsFactory(name='test_2')
        response = self.client.get('/api/sections')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_section(self):
        response = self.client.post('/api/sections', {'name': 'new_test',
                                                      'category_id': self.test_categories.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'id': self.test_section.id + 1,
                                           'name': 'new_test',
                                           'category_id': self.test_categories.id,
                                           'category': self.test_categories.id})

    def test_update_section(self):
        response = self.client.patch(f'/api/section/{self.test_section.id}',
                                     {'id': self.test_section.id, 'name': 'new_name'})
        self.assertEqual(response.status_code, 200)
        self.test_section.refresh_from_db()
        self.assertEqual(self.test_section.name, 'new_name')

    def test_delete_section(self):
        response = self.client.delete(f'/api/section/{self.test_section.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(models.Sections.objects.filter(id=self.test_section.id).exists())


class SubSectionsApiTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.test_subsection = SubsectionsFactory(name='test')
        self.test_section = SectionsFactory(name='test')

    def test_get_subsection(self):
        response = self.client.get(f'/api/subsection/{self.test_subsection.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': self.test_subsection.id,
                                           'name': self.test_subsection.name,
                                           'section_id': self.test_subsection.section_id,
                                           'section': self.test_subsection.section_id})

    def test_get_subsections_list(self):
        SubsectionsFactory(name='test_2')
        response = self.client.get('/api/subsections')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_subsection(self):
        response = self.client.post('/api/subsections', {'name': 'new_test',
                                                         'section_id': self.test_section.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'id': self.test_subsection.id + 1,
                                           'name': 'new_test',
                                           'section_id': self.test_section.id,
                                           'section': self.test_section.id})

    def test_update_subsection(self):
        response = self.client.patch(f'/api/subsection/{self.test_subsection.id}',
                                     {'id': self.test_subsection.id, 'name': 'new_name'})
        self.assertEqual(response.status_code, 200)
        self.test_subsection.refresh_from_db()
        self.assertEqual(self.test_subsection.name, 'new_name')

    def test_delete_subsection(self):
        response = self.client.delete(f'/api/subsection/{self.test_subsection.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(models.Subsections.objects.filter(id=self.test_subsection.id).exists())


class TopicsApiTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.test_topic = TopicsFactory(name='test')
        self.test_subsection = SubsectionsFactory(name='test')
        self.test_user = UsersFactory(username='test')

    def test_get_topic(self):
        response = self.client.get(f'/api/topic/{self.test_topic.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': self.test_topic.id,
                                           'name': self.test_topic.name,
                                           'subsection_id': self.test_topic.subsection_id,
                                           'subsection': self.test_topic.subsection_id,
                                           'text': self.test_topic.text,
                                           'user': None,
                                           'user_id': None})

    def test_get_topics_list(self):
        TopicsFactory(name='test_2')
        response = self.client.get('/api/topics')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_topic(self):
        response = self.client.post('/api/topics', {'name': 'new_test',
                                                    'text': 'new_test_text',
                                                    'subsection_id': self.test_subsection.id,
                                                    'user_id': self.test_user.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'id': self.test_topic.id + 1,
                                           'text': 'new_test_text',
                                           'name': 'new_test',
                                           'subsection_id': self.test_subsection.id,
                                           'subsection': self.test_subsection.id,
                                           'user': self.test_user.id,
                                           'user_id': self.test_user.id})

    def test_update_topic(self):
        response = self.client.patch(f'/api/topic/{self.test_topic.id}',
                                     {'id': self.test_topic.id, 'name': 'new_name'})
        self.assertEqual(response.status_code, 200)
        self.test_topic.refresh_from_db()
        self.assertEqual(self.test_topic.name, 'new_name')

    def test_delete_topic(self):
        response = self.client.delete(f'/api/topic/{self.test_topic.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(models.Topics.objects.filter(id=self.test_topic.id).exists())


class CommentsApiTestCase(TestCase):

    def setUp(self):
        self.test_user = UsersFactory(username='test')
        self.test_user_token = TokensFactory(user=self.test_user)
        self.test_comment = CommentsFactory(text='test_comment_text', user=self.test_user)
        self.test_topic = TopicsFactory(name='test')
        self.client = APIClient()
        self.client.force_authenticate(user=self.test_user)

    def test_get_comment(self):
        response = self.client.get(f'/api/comment/{self.test_comment.id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': self.test_comment.id,
                                           'topic_id': self.test_comment.topic_id,
                                           'topic': self.test_comment.topic_id,
                                           'text': 'test_comment_text',
                                           'user': self.test_user.id,
                                           'user_id': self.test_user.id})

    def test_get_comments_list(self):
        CommentsFactory(text='test_comment_text_2')
        response = self.client.get('/api/comments')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_comment(self):
        response = self.client.post('/api/comments', {'text': 'new_test_text',
                                                      'topic_id': self.test_topic.id,
                                                      'user_id': self.test_user.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'id': self.test_comment.id + 1,
                                           'text': 'new_test_text',
                                           'topic_id': self.test_topic.id,
                                           'topic': self.test_topic.id,
                                           'user': self.test_user.id,
                                           'user_id': self.test_user.id})

    def test_update_comment(self):
        response = self.client.patch(f'/api/comment/{self.test_comment.id}',
                                     {'id': self.test_comment.id, 'text': 'new_text'})
        self.assertEqual(response.status_code, 200)
        self.test_comment.refresh_from_db()
        self.assertEqual(self.test_comment.text, 'new_text')

    def test_delete_comment(self):
        response = self.client.delete(f'/api/comment/{self.test_comment.id}')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(models.Comments.objects.filter(id=self.test_comment.id).exists())
