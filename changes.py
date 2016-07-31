"""Changelog."""
import sublime
import sublime_plugin
import mdpopups


class MtChangesCommand(sublime_plugin.WindowCommand):
    """Changelog command."""

    def run(self):
        """Show the changelog in a new view."""
        text = sublime.load_resource('Packages/Material Theme/CHANGELOG.md')
        view = self.window.new_file()
        view.set_name('Material Theme - Changlog')
        view.settings().set('gutter', False)
        mdpopups.add_phantom(view, 'chagelog', sublime.Region(0), text, sublime.LAYOUT_INLINE)
        view.set_read_only(True)
        view.set_scratch(True)

    def is_enabled(self):
        """Check if is enabled."""
        return (mdpopups.version() >= (1, 7, 3)) and (int(sublime.version()) >= 3118)

    is_visible = is_enabled