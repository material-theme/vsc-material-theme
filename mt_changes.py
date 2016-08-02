"""Changelog."""
import sublime
import sublime_plugin

CSS = '''
.mt-config-changes { {{'.background'|css}} margin: 0; padding: 0; }
.mt-config-changes ul li, .bracket-hightlighter p { {{'.foreground'|css}} }
.mt-config-changes a { color: #4B67FF; }
.mt-config-changes h1, .mt-config-changes h2, .mt-config-changes h3,
.mt-config-changes h4, .mt-config-changes h5, .mt-config-changes h6 {
    {{'.string'|css('color')}}
}
.mt-config-changes h1, .mt-config-changes h2 { margin-top: 50px; }
.mt-config-changes h3, .mt-config-changes h4 { margin-top: 30px; }
.mt-config-changes blockquote { {{'.foreground'|css('color')}} }
'''


class MtChangesCommand(sublime_plugin.WindowCommand):
    """Changelog command."""

    def run(self):
        """Show the changelog in a new view."""
        import mdpopups
        text = sublime.load_resource('Packages/Material Theme/CHANGELOG.md')
        view = self.window.new_file()
        view.set_name('Material Theme - Changelog')
        view.settings().set('gutter', False)
        html = '<div class="mt-config-changes">%s</div>' % mdpopups.md2html(view, text)
        mdpopups.add_phantom(view, 'changelog', sublime.Region(0), html, sublime.LAYOUT_INLINE, css=CSS)
        view.set_read_only(True)
        view.set_scratch(True)

    def is_enabled(self):
        """Check if is enabled."""
        try:
            import mdpopups
        except Exception:
            return False

        return (mdpopups.version() >= (1, 7, 3)) and (int(sublime.version()) >= 3118)

    is_visible = is_enabled