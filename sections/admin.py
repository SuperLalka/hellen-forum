from django.contrib import admin

from . import models


@admin.register(models.Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(models.Sections)
class SectionsAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    search_fields = ['name']


@admin.register(models.Subsections)
class SubsectionsAdmin(admin.ModelAdmin):
    list_display = ['name', 'section']
    search_fields = ['name']


@admin.register(models.Topics)
class TopicsAdmin(admin.ModelAdmin):
    list_display = ['name', 'subsection']
    search_fields = ['name']


@admin.register(models.Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ['id', 'topic']
