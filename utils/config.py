# -*- coding: utf-8 -*-

'''
Material Theme Config.
'''
import sublime
import sublime_plugin
import mdpopups
import os
from collections import OrderedDict

OPTIONS = OrderedDict(
    (
        (
          'Accent',
          [
            'material_theme_accent_lime',
            'material_theme_accent_purple',
            'material_theme_accent_red',
            'material_theme_accent_orange',
            'material_theme_accent_yellow',
            'material_theme_accent_indigo',
            'material_theme_accent_pink',
            'material_theme_accent_blue',
            'material_theme_accent_cyan',
            'material_theme_accent_bright-teal',
            'material_theme_accent_acid-lime',
            'material_theme_accent_graphite',
            'material_theme_accent_brba',
            'material_theme_accent_sky',
            'material_theme_accent_tomato'
          ],
        ),
        (
          'Tabs',
          [
            'material_theme_tabs_autowidth',
            'material_theme_tabs_separator',
            'material_theme_bold_tab',
            'material_theme_small_tab'
          ],
        ),
        (
          'Sidebar',
          [
            'material_theme_big_fileicons',
            'material_theme_disable_fileicons',
            'material_theme_disable_folder_animation',
            'material_theme_arrow_folders',
            'material_theme_compact_sidebar',
            'material_theme_bullet_tree_indicator',
            'material_theme_disable_tree_indicator',
            'material_theme_tree_headings'
          ],
        ),
        (
          'Panels',
          [
            'material_theme_compact_panel',
            'material_theme_small_statusbar',
            'material_theme_panel_separator',
            'material_theme_contrast_mode',
            'material_theme_bright_scrollbars',
            'material_theme_accent_scrollbars'
          ],
        )
    )
)


BACK = '[← BACK](back){: .mt-config .ui-backlink }'
SECTIONS = '[• %(section)s](::%(section)s){: .mt-config .ui-control }\n'
SECTION_LABEL = '\n\n## Material Theme - %s\n\n'
SECTIONS_LABEL = '\n\n## Config - Material Theme\n\n'
GENERAL_SETTING = '''[**%(status)s**{: .mt-config %(class)s} %(name)s](%(name)s:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
SCHEME = '''[**%(status)s**{: .mt-config %(class)s} %(name)s](color_scheme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
THEME_LABEL = '\n\n## Themes - Material Theme\n\n'
SCHEME_LABEL = '\n\n## Schemes - Material Theme\n\n'
OTHER_SCHEME = '''[**%(status)s**{: .mt-config .ui-control %(class)s} Other: %(name)s]\
(color_scheme:%(set)s:%(section)s){: .mt-config .ui-control }\n'''
THEME = '''[**%(status)s**{: .mt-config .ui-control %(class)s} %(name)s](theme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
OTHER_THEME = '''[**%(status)s**{: .mt-config .ui-control %(class)s} Other: %(name)s](theme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
MARKED = '☑︎'
UNMARKED = '☐'
RADIO_MARKED = '•'
RADIO_UNMARKED = '•'
STYLE = '''\
html,
body {
  padding: 0;
}

{% if var.sublime_version < 3119 %}
  body {
    padding: 16px;
    padding-bottom: 8px;
  }

  p {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  a {
    display: block;
    padding: 0.25em 0;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 20px;
  }

  .mt-config.ui-control {
    text-decoration: none;
  }

  .mt-config.ui-backlink {
    text-decoration: none;
    padding: 4px 0;
  }

{% else %}

  div.mt-config {
    display: block;
    padding: 16px;
  }

  .mt-config h1,
  .mt-config h2,
  .mt-config h3,
  .mt-config h4,
  .mt-config h5,
  .mt-config h6 {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 20px;
  }

  .mt-config p {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  .mt-config a {
    display: block;
    padding: 0.25em 0;
    text-decoration: none;
  }

  .mt-config .ui-control {
    text-decoration: none;
  }

  .mt-config .ui-backlink {
    {{'.foreground'|css}}
    text-decoration: none;
    padding: 4px 0;
    display: block;
  }

{% endif %}
'''


def is_mt_res(item):
    '''Check if a Material Theme resource.'''

    return item.startswith('Packages/Material Theme/')


'''Material Theme Configuration.'''
class MtConfigCommand(sublime_plugin.TextCommand):

    '''Handle option selection.'''
    def on_navigate(self, href):
        try:
          import mdpopups
        except Exception:
          return False

        if href.startswith('back'):
          self.show_popup('Main')
        else:
          settings = sublime.load_settings('Preferences.sublime-settings')
          name, value, section = href.split(':')
          if name:
            if name not in ('theme', 'color_scheme'):
              boolean = True if value == 'True' else False
              if boolean:
                settings.set(name, boolean)
              else:
                settings.erase(name)
            else:
              settings.set(name, value)
            sublime.save_settings('Preferences.sublime-settings')

          self.show_popup(section)

    '''Show config popup.'''
    def show_popup(self, menu):

      settings = sublime.load_settings('Preferences.sublime-settings')
      popup = []

      marked = settings.get('theme_config_marked', False)
      unmarked = settings.get('theme_config_unmarked', False)
      radio_marked = settings.get('theme_config_radio_marked', False)
      radio_unmarked = settings.get('theme_config_radio_unmarked', False)

      if marked is False:
        marked = MARKED

      if unmarked is False:
        unmarked = UNMARKED

      if radio_marked is False:
        radio_marked = RADIO_MARKED

      if radio_unmarked is False:
        radio_unmarked = RADIO_UNMARKED

      if menu != 'Main':
        popup = [BACK]

      if menu == 'Main':
        popup.append(SECTIONS_LABEL)
        for k in sorted(['Theme', 'Color Scheme'] + list(OPTIONS.keys())):
          popup.append(SECTIONS % {'section': k})

      elif menu == 'Theme':
        theme = settings.get('theme', '')
        mt_themes = [
          os.path.basename(bt) for bt in sorted(sublime.find_resources('Material-Theme*.sublime-theme')) if is_mt_res(bt)
        ]
        popup.append(THEME_LABEL)
        for option in sorted(mt_themes):
          option_value = theme == option
          popup.append(
            THEME % {
              'name': option,
              'status': RADIO_MARKED if option_value else RADIO_UNMARKED,
              'set': option,
              'class': '.success' if option_value else '.error',
              'section': 'Theme'
            }
          )
        if theme is not None and theme not in mt_themes:
          popup.append(
            OTHER_THEME % {
              'name': theme,
              'status': RADIO_MARKED,
              'set': option,
              'class': '.success' if option_value else '.error',
              'section': 'Theme'
            }
          )

      elif menu == 'Color Scheme':
        scheme = settings.get('color_scheme', '')
        mt_schemes = [
            bs for bs in sorted(sublime.find_resources('Material-Theme*.tmTheme')) if is_mt_res(bs)
        ]
        popup.append(SCHEME_LABEL)
        for option in sorted(mt_schemes):
          option_value = scheme == option
          scheme_name = option[32:].replace('.tmTheme', '')
          popup.append(
            SCHEME % {
              'name': scheme_name,
              'status': RADIO_MARKED if option_value else RADIO_UNMARKED,
              'set': option,
              'class': '.success' if option_value else '.error',
              'section': 'Color Scheme'
            }
          )
          if scheme is not None and scheme not in mt_schemes:
            popup.append(
              OTHER_SCHEME % {
                'name': scheme,
                'status': RADIO_MARKED,
                'set': option,
                'class': '.success',
                'section': 'Color Scheme'
              }
            )
      else:
        popup.append(SECTION_LABEL % menu)
        for option in sorted(OPTIONS[menu]):
          option_value = bool(settings.get(option, False))
          popup.append(
            GENERAL_SETTING % {
              'name': option,
              'status': MARKED if option_value else UNMARKED,
              'set': str(not option_value),
              'class': '.success' if option_value else '.error',
              'section': menu
            }
          )

      mdpopups.hide_popup(self.view)
      mdpopups.show_popup(
        self.view,
        ''.join(popup),
        css=STYLE,
        wrapper_class='mt-config',
        on_navigate=self.on_navigate,
        max_width=800,
        max_height=400
      )

    def run(self, edit):
      self.show_popup('Main')
