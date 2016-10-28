"""Changelog."""
import sublime
import sublime_plugin
import webbrowser


"""Repository command."""


class MtRepoCommand(sublime_plugin.WindowCommand):
    def run(self):
        """Open the repository in a browser tab."""
        webbrowser.open_new_tab('https://github.com/equinusocio/material-theme')


"""Issues command."""


class MtIssuesCommand(sublime_plugin.WindowCommand):
    def run(self):
        """Open the issues page in a browser tab"""
        webbrowser.open_new_tab('https://github.com/equinusocio/material-theme/issues')
