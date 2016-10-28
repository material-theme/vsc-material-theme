# -*- coding: utf-8 -*-

"""
Material Theme Changelog
"""

import sublime
import sublime_plugin
import webbrowser

STYLES = '''
.mdpopups {
  {{'.background'|css}}
}

.mt-config-changes ul li, .mt-config-changes p {
  {{'.foreground'|css}}
}

.mt-config-changes a {
  text-decoration: none;
  color: #6D88FF;
}

.mt-config-changes h1,
.mt-config-changes h2,
.mt-config-changes h3,
.mt-config-changes h4,
.mt-config-changes h5,
.mt-config-changes h6 {
  {{'.string'|css('color')}}
}

.mt-config-changes h1,
.mt-config-changes h2 {
  margin-top: 50px;
}

.mt-config-changes h3,
.mt-config-changes h4 {
  margin-top: 30px;
}
'''


class MtChangesCommand(sublime_plugin.WindowCommand):
  def on_navigate(self, href):
    webbrowser.open_new_tab(href)

  def run(self):
      import mdpopups
      text = sublime.load_resource('Packages/Material Theme/CHANGELOG.md')
      view = self.window.new_file()
      view.set_name('Material Theme Changelog')
      view.settings().set('gutter', False)
      html = '<div class="mt-config-changes">%s</div>' % mdpopups.md2html(view, text)
      mdpopups.add_phantom(view, 'changelog', sublime.Region(0), html, sublime.LAYOUT_INLINE, css=STYLES, on_navigate=self.on_navigate)
      view.set_read_only(True)
      view.set_scratch(True)

  def is_enabled(self):
      try:
          import mdpopups
      except Exception:
          return False

      return (mdpopups.version() >= (1, 9, 0)) and (int(sublime.version()) >= 3119)

  is_visible = is_enabled
