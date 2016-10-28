# -*- coding: utf-8 -*-

"""
Material Theme Activation
"""

import sublime
import sublime_plugin
import functools

NO_SELECTION = -1
PREFERENCES = 'Preferences.sublime-settings'
THEMES = [
  'Material-Theme',
  'Material-Theme-Palenight',
  'Material-Theme-Darker',
  'Material-Theme-Lighter'
]


def get_color_scheme():
  return sublime.load_settings(PREFERENCES).get('color_scheme', '')


def set_color_scheme(path):
  return sublime.load_settings(PREFERENCES).set('color_scheme', path)


def preview_color_scheme(path):
  set_color_scheme(path)


def activate_color_scheme(path):
  set_color_scheme(path)
  commit()


def revert_color_scheme(path):
  set_color_scheme(path)


def get_ui_theme():
  return sublime.load_settings(PREFERENCES).get('theme', '')


def set_ui_theme(path):
  return sublime.load_settings(PREFERENCES).set('theme', path)


def preview_ui_theme(path):
  set_ui_theme(path)


def activate_ui_theme(path):
  set_ui_theme(path)
  commit()


def revert_ui_theme(path):
  set_ui_theme(path)


def commit():
  return sublime.save_settings(PREFERENCES)


class MtActivateCommand(sublime_plugin.WindowCommand):

  def display_list(self, themes):
    self.themes = themes
    self.initial_color_scheme = get_color_scheme()
    self.initial_ui_theme = get_ui_theme()

    quick_list = [theme for theme in self.themes]
    self.quick_list = quick_list

    self.window.show_quick_panel(quick_list, self.on_done, on_highlight=self.on_highlighted)

  def on_highlighted(self, index):
    preview_color_scheme(self._quick_list_to_scheme(index))
    preview_ui_theme(self._quick_list_to_theme(index))

  def on_done(self, index):
    if index is NO_SELECTION:
      revert_color_scheme(self.initial_color_scheme)
      revert_ui_theme(self.initial_ui_theme)
      return

    color_scheme = self._quick_list_to_scheme(index)
    activate_color_scheme(color_scheme)

    ui_theme = self._quick_list_to_theme(index)
    activate_ui_theme(ui_theme)

  def _quick_list_to_scheme(self, index):
    return 'Packages/Material Theme/schemes/%s.tmTheme' % self.quick_list[index]

  def _quick_list_to_theme(self, index):
    return '%s.sublime-theme' % self.quick_list[index]

  def run(self):
    self.display_list(THEMES)
