from django import forms


class FilterForm(forms.Form):
    filter = forms.ChoiceField(choices=[(1, "True pairs"), (0, "Not pairs"), (-1, "No Filter")],
                               widget=forms.RadioSelect(
                                   attrs={'onchange': 'form.submit()',
                                          'id':'filter'},
                               ))