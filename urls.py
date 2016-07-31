"""Changelog."""
import sublime
import sublime_plugin
import webbrowser


class MtRepoCommand(sublime_plugin.WindowCommand):
    """Changelog command."""

    def run(self):
        """Show the changelog in a new view."""
        webbrowser.open_new_tab('https://github.com/equinusocio/material-theme')


class MtIssuesCommand(sublime_plugin.WindowCommand):
    """Changelog command."""

    def run(self):
        """Show the changelog in a new view."""
        webbrowser.open_new_tab('https://github.com/equinusocio/material-theme/issues')