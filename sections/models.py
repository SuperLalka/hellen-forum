from django.db import models


class Categories(models.Model):
    name = models.CharField(max_length=80, help_text="Enter category name")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Sections(models.Model):
    name = models.CharField(max_length=50, help_text="Enter section name")
    category = models.ForeignKey('Categories', on_delete=models.CASCADE,
                                 null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Раздел'
        verbose_name_plural = 'Разделы'


class Subsections(models.Model):
    name = models.CharField(max_length=50, help_text="Enter subsection name")
    section = models.ForeignKey('Sections', on_delete=models.CASCADE,
                                null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Подраздел'
        verbose_name_plural = 'Подразделы'


class Topics(models.Model):
    name = models.CharField(max_length=50, help_text="Enter topic name")
    subsection = models.ForeignKey('Subsections', on_delete=models.CASCADE,
                                   null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class Comments(models.Model):
    text = models.TextField(max_length=300)
    topic = models.ForeignKey('Topics', on_delete=models.CASCADE,
                              null=True, blank=True)

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['id']
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
