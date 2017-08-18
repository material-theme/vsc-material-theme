"""
A File Icon Installer
"""

import os
import sublime

ICONS_PACKAGE = "A File Icon"
PKGCTRL_SETTINGS = "Package Control.sublime-settings"

THEME_NAME = os.path.splitext(
    os.path.basename(os.path.dirname(__file__))
)[0]

MSG = """\
<div id="afi-installer">
  <style>
    #afi-installer {{
      padding: 1rem;
      line-height: 1.5;
    }}
    #afi-installer code {{
      background-color: color(var(--background) blend(var(--foreground) 80%));
      line-height: 1;
      padding: 0.25rem;
    }}
    #afi-installer a {{
      padding: 0;
      margin: 0;
    }}
  </style>

  {} requires <code>A File Icon</code> package for enhanced<br>support of
  the file-specific icons.
  <br><br>Would you like to install it?<br>
  <br><a href="install">Install</a> <a href="cancel">Cancel</a>
</div>
""".format(THEME_NAME)


def is_installed():
    pkgctrl_settings = sublime.load_settings(PKGCTRL_SETTINGS)

    return ICONS_PACKAGE in set(pkgctrl_settings.get("installed_packages", []))


def on_navigate(href):
    if href.startswith("install"):
        install()
    else:
        hide()


def install():
    print("Installing `{}` ...".format(ICONS_PACKAGE))
    sublime.active_window().run_command(
        "advanced_install_package", {"packages": ICONS_PACKAGE}
    )
    hide()


def hide():
    sublime.active_window().active_view().hide_popup()


def plugin_loaded():
    from package_control import events

    if events.install(THEME_NAME) and not is_installed():
        window = sublime.active_window()
        view = window.active_view()
        window.focus_view(view)
        row = int(view.rowcol(view.visible_region().a)[0] + 1)
        view.show_popup(
            MSG,
            location=view.text_point(row, 5),
            max_width=800,
            max_height=800,
            on_navigate=on_navigate
        )
