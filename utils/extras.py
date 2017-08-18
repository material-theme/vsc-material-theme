# -*- coding: utf-8 -*-

"""
Material Theme Extras
"""

import sublime
import sublime_plugin
from collections import OrderedDict


NO_SELECTION = -1

PLAIN_TASKS = 'PlainTasks'

PLAIN_NOTES = 'PlainNotes'

EXTRAS = OrderedDict(
    [
        (
            'PlainNotes',
            {
                'name': 'Plain Notes',
                'settings': 'Note.sublime-settings',
                'desc': 'Choose a color scheme'
            }
        ),
        (
            'PlainTasks',
            {
                'name': 'Plain Tasks',
                'settings': 'PlainTasks.sublime-settings',
                'desc': 'Choose a color scheme'
            }
        )
    ]
)

THEMES = [
    'Material-Theme',
    'Material-Theme-Darker',
    'Material-Theme-Lighter',
    'Material-Theme-Palenight'
]


def get_settings(pkg):
    return sublime.load_settings(EXTRAS[pkg].get('settings'))


def save_settings(pkg):
    return sublime.save_settings(EXTRAS[pkg].get('settings'))


def get_theme(pkg):
    settings = get_settings(pkg)

    if pkg in (PLAIN_TASKS, PLAIN_NOTES):
        return settings.get('color_scheme', '')


def set_theme(pkg, path):
    settings = get_settings(pkg)

    if pkg in (PLAIN_TASKS, PLAIN_NOTES):
        return settings.set('color_scheme', path)


def activate_theme(pkg, path):
    set_theme(pkg, path)
    return save_settings(pkg)


def revert_theme(pkg, path):
    if path is '':
        get_settings(pkg).erase('color_scheme')
    else:
        set_theme(pkg, path)

    return save_settings(pkg)


class MtExtrasCommand(sublime_plugin.WindowCommand):

    def display_list(self, extras):
        self.extras = extras
        self.quick_list = []

        name = ''
        desc = ''

        for extra in self.extras:
            name = self.extras[extra].get('name')
            desc = self.extras[extra].get('desc')
            self.quick_list.append([name, desc])

        self.window.show_quick_panel(self.quick_list, self.on_done)

    def on_done(self, index):
        if index is NO_SELECTION:
            return

        if index is 0:
            self.window.run_command('mt_plain_notes')

        if index is 1:
            self.window.run_command('mt_plain_tasks')

    def run(self):
        self.display_list(EXTRAS)


class mtPlainTasksCommand(sublime_plugin.WindowCommand):

    def display_list(self, themes):
        self.themes = themes
        self.initial_theme = get_theme(PLAIN_TASKS)

        quick_list = [theme for theme in self.themes]
        self.quick_list = quick_list

        self.window.show_quick_panel(quick_list, self.on_done,
                                     on_highlight=self.on_highlighted)

    def on_highlighted(self, index):
        set_theme(PLAIN_TASKS, self._quick_list_to_theme(index))

    def on_done(self, index):
        if index is NO_SELECTION:
            revert_theme(PLAIN_TASKS, self.initial_theme)
            return

        activate_theme(PLAIN_TASKS, self._quick_list_to_theme(index))

    def _quick_list_to_theme(self, index):
        return ('Packages/Material Theme/extras/PlainTasks/%s.hidden-tmTheme' %
                self.quick_list[index])

    def run(self):
        self.display_list(THEMES)


class MtPlainNotesCommand(sublime_plugin.WindowCommand):

    def display_list(self, themes):
        self.themes = themes
        self.initial_theme = get_theme(PLAIN_NOTES)

        quick_list = [theme for theme in self.themes]
        self.quick_list = quick_list

        self.window.show_quick_panel(quick_list, self.on_done,
                                     on_highlight=self.on_highlighted)

    def on_highlighted(self, index):
        set_theme(PLAIN_NOTES, self._quick_list_to_theme(index))

    def on_done(self, index):
        if index is NO_SELECTION:
            revert_theme(PLAIN_NOTES, self.initial_theme)
            return

        activate_theme(PLAIN_NOTES, self._quick_list_to_theme(index))

    def _quick_list_to_theme(self, index):
        return ('Packages/Material Theme/schemes/%s.tmTheme' %
                self.quick_list[index])

    def run(self):
        self.display_list(THEMES)
