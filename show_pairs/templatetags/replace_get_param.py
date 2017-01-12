from django import template

register = template.Library()

@register.filter
def replace_get_param(value):
    return value.replace("?","%3F")