# -*- coding: utf-8 -*-
"""Material Theme Config."""
import sublime
import sublime_plugin
import mdpopups
import os
from collections import OrderedDict

OPTIONS = OrderedDict(
    (
        (
            "Size",
            [
                "theme_size_xs",
                "theme_size_sm",
                "theme_size_md",
                "theme_size_lg",
                "theme_size_xl"
            ],
        ),
        (
            "Font",
            [
                "theme_font_xs",
                "theme_font_sm",
                "theme_font_md",
                "theme_font_lg",
                "theme_font_xl"
            ],
        ),
        (
            "Accent",
            [
                "theme_accent_blue",
                "theme_accent_green",
                "theme_accent_orange",
                "theme_accent_purple",
                "theme_accent_tangerine",
                "theme_accent_cyan",
                "theme_accent_lime",
                "theme_accent_pink",
                "theme_accent_sky"
            ],
        ),
        (
            "Icons",
            [
                "theme_icons_materialized",
                "theme_icons_atomized",
            ],
        ),
        (
            "Bar",
            [
                "theme_bar",
                "theme_bar_colored",
                "theme_bar_logo_materialized",
                "theme_bar_logo_atomized",
                "theme_bar_margin_top_sm",
                "theme_bar_margin_top_md",
                "theme_bar_margin_top_lg"
            ],
        ),
        (
            "Tab Size",
            [
                "theme_tab_size_xs",
                "theme_tab_size_sm",
                "theme_tab_size_md",
                "theme_tab_size_lg",
                "theme_tab_size_xl",
                "theme_tab_width_auto"
            ],
        ),
        (
            "Tab Font",
            [
                "theme_tab_font_xs",
                "theme_tab_font_sm",
                "theme_tab_font_md",
                "theme_tab_font_lg",
                "theme_tab_font_xl",
                "theme_tab_label_bold",
                "theme_tab_selected_label_bold"
            ],
        ),
        (
            "Tab Flavors",
            [
                "theme_tab_rounded",
                "theme_tab_selected_underlined",
                "theme_tab_selected_prelined",
                "theme_tab_selected_filled",
                "theme_tab_selected_transparent",
                "theme_tab_line_size_sm",
                "theme_tab_line_size_lg"
            ],
        ),
        (
            "Tab Misc",
            [
                "theme_tab_arrows_hidden",
                "theme_tab_mouse_wheel_switch",
                "theme_tab_separator",
                "theme_tab_highlight_text_only",
                "theme_tab_close_always_visible",
                "theme_dirty_materialized",
                "theme_dropdown_materialized",
                "theme_dropdown_atomized"
            ],
        ),
        (
            "Find Panel Size",
            [
                "theme_find_panel_size_xs",
                "theme_find_panel_size_sm",
                "theme_find_panel_size_md",
                "theme_find_panel_size_lg",
                "theme_find_panel_size_xl"
            ],
        ),
        (
            "Find Panel Font",
            [
                "theme_find_panel_font_xs",
                "theme_find_panel_font_sm",
                "theme_find_panel_font_md",
                "theme_find_panel_font_lg",
                "theme_find_panel_font_xl"
            ],
        ),
        (
            "Find Panel Misc",
            [
                "theme_find_panel_close_hidden",
                "theme_button_rounded",
                "theme_icon_button_highlighted",
                "theme_button_inverted",
                "theme_find_panel_materialized",
                "theme_find_panel_atomized"
            ],
        ),
        (
            "Quick Panel Size",
            [
                "theme_quick_panel_size_xs",
                "theme_quick_panel_size_sm",
                "theme_quick_panel_size_md",
                "theme_quick_panel_size_lg",
                "theme_quick_panel_size_xl"
            ],
        ),
        (
            "Quick Panel Misc",
            [
                "theme_quick_panel_item_selected_colored"
            ],
        ),
        (
            "Sidebar Size",
            [
                "theme_sidebar_size_xxs",
                "theme_sidebar_size_xs",
                "theme_sidebar_size_sm",
                "theme_sidebar_size_md",
                "theme_sidebar_size_lg",
                "theme_sidebar_size_xl"
            ],
        ),
        (
            "Sidebar Font",
            [
                "theme_sidebar_font_xs",
                "theme_sidebar_font_sm",
                "theme_sidebar_font_md",
                "theme_sidebar_font_lg",
                "theme_sidebar_font_xl"
            ],
        ),
        (
            "Sidebar Indent",
            [
                "theme_sidebar_indent_xs",
                "theme_sidebar_indent_sm",
                "theme_sidebar_indent_md",
                "theme_sidebar_indent_lg",
                "theme_sidebar_indent_xl"
            ],
        ),
        (
            "Sidebar Misc",
            [
                "theme_sidebar_border",
                "theme_sidebar_indent_top_level_disabled",
                "theme_sidebar_highlight_text_only",
                "theme_sidebar_heading_bold"
            ],
        ),
        (
            "Sidebar Icons",
            [
                "theme_sidebar_file_icons_hidden",
                "theme_sidebar_folder_arrow",
                "theme_sidebar_disclosure",
                "theme_sidebar_folder_mono",
                "theme_sidebar_close_always_visible",
                "theme_sidebar_folder_materialized",
                "theme_sidebar_folder_atomized",
                "theme_sidebar_icon_saturation_lw",
                "theme_sidebar_icon_saturation_md",
                "theme_sidebar_icon_saturation_hg",
                "theme_sidebar_icon_saturation_xh"
            ],
        ),
        (
            "Status Bar Size",
            [
                "theme_statusbar_size_xs",
                "theme_statusbar_size_sm",
                "theme_statusbar_size_md",
                "theme_statusbar_size_lg",
                "theme_statusbar_size_xl"
            ],
        ),
        (
            "Status Bar Font",
            [
                "theme_statusbar_label_bold",
                "theme_statusbar_font_xs",
                "theme_statusbar_font_sm",
                "theme_statusbar_font_md",
                "theme_statusbar_font_lg",
                "theme_statusbar_font_xl"
            ],
        ),
        (
            "Status Bar Misc",
            [
                "theme_statusbar_colored",
                "theme_panel_switcher_materialized",
                "theme_panel_switcher_atomized"
            ],
        ),
        (
            "Scrollbars",
            [
                "theme_scrollbar_line",
                "theme_scrollbar_colored",
                "theme_scrollbar_rounded"
            ],
        ),
        (
            "Tooltips",
            [
                "theme_tooltips_font_xs",
                "theme_tooltips_font_sm",
                "theme_tooltips_font_md",
                "theme_tooltips_font_lg",
                "theme_tooltips_font_xl"
            ],
        ),
        (
            "Grid",
            [
                "theme_grid_border_size_xs",
                "theme_grid_border_size_sm",
                "theme_grid_border_size_md",
                "theme_grid_border_size_lg",
                "theme_grid_border_size_xl"
            ],
        ),
        (
            "Popups",
            [
                "theme_autocomplete_item_selected_colored",
                "theme_popup_border_visible"
            ]
        )
    )
)

BACK = '[◀](back){: .mt-config .ui-control }'
SECTIONS = '- [%(section)s](::%(section)s){: .mt-config .ui-control }\n'
SECTION_LABEL = '\n\n## Material Theme - %s\n\n'
SECTIONS_LABEL = '\n\n## Material Theme - Config\n\n'
GENERAL_SETTING = '''- [**%(status)s**{: .mt-config %(class)s} %(name)s](%(name)s:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
SCHEME = '''- [**%(status)s**{: .mt-config %(class)s} %(name)s](color_scheme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
THEME_LABEL = '\n\n## Material Theme - Themes\n\n'
SCHEME_LABEL = '\n\n## Material Theme - Color Schemes\n\n'
OTHER_SCHEME = '''- [**%(status)s**{: .mt-config .ui-control %(class)s} Other: %(name)s]\
(color_scheme:%(set)s:%(section)s){: .mt-config .ui-control }\n'''
THEME = '''- [**%(status)s**{: .mt-config .ui-control %(class)s} %(name)s](theme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
OTHER_THEME = '''- [**%(status)s**{: .mt-config .ui-control %(class)s} Other: %(name)s](theme:%(set)s:%(section)s)\
{: .mt-config .ui-control }\n'''
MARKED = "✓"
UNMARKED = "✗"
RADIO_MARKED = "☒"
RADIO_UNMARKED = "☐"
css = """\
.mt-config.small { font-size: {{'*.8px'|relativesize}}; }
.mt-config.ui-control { text-decoration: none; }
"""


def is_mt_res(item):
    """Check if a boxy resource."""

    return item.startswith('Packages/Boxy Theme/')


class MtConfigCommand(sublime_plugin.TextCommand):
    """Material Theme Configuration."""

    def on_navigate(self, href):
        """Handle option selection."""

        if href == 'back':
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

    def show_popup(self, menu):
        """Show config popup."""

        settings = sublime.load_settings('Preferences.sublime-settings')
        popup = []
        if menu != 'Main':
            popup = [BACK]

        if menu == 'Main':
            popup.append(SECTIONS_LABEL)
            for k in ['Theme', 'Color Scheme'] + list(OPTIONS.keys()):
                popup.append(SECTIONS % {"section": k})
        elif menu == 'Theme':
            theme = settings.get('theme', '')
            boxy_themes = [
                os.path.basename(bt) for bt in sorted(sublime.find_resources('Boxy*.sublime-theme')) if is_mt_res(bt)
            ]
            popup.append(THEME_LABEL)
            for option in boxy_themes:
                option_value = theme == option
                popup.append(
                    THEME % {
                        "name": option,
                        "status": RADIO_MARKED if option_value else RADIO_UNMARKED,
                        "set": option,
                        "class": '.success' if option_value else '.error',
                        'section': "Theme"
                    }
                )
            if theme is not None and theme not in boxy_themes:
                popup.append(
                    OTHER_THEME % {
                        "name": theme,
                        "status": RADIO_MARKED,
                        "set": option,
                        "class": '.success' if option_value else '.error',
                        'section': "Theme"
                    }
                )
        elif menu == 'Color Scheme':
            scheme = settings.get('color_scheme', '')
            boxy_schemes = [
                bs for bs in sorted(sublime.find_resources('Boxy*.tmTheme')) if is_mt_res(bs)
            ]
            popup.append(SCHEME_LABEL)
            for option in boxy_schemes:
                option_value = scheme == option
                popup.append(
                    SCHEME % {
                        "name": option,
                        "status": RADIO_MARKED if option_value else RADIO_UNMARKED,
                        "set": option,
                        "class": '.success' if option_value else '.error',
                        "section": 'Color Scheme'
                    }
                )
            if scheme is not None and scheme not in boxy_schemes:
                popup.append(
                    OTHER_SCHEME % {
                        "name": scheme,
                        "status": RADIO_MARKED,
                        "set": option,
                        "class": '.success',
                        "section": 'Color Scheme'
                    }
                )
        else:
            popup.append(SECTION_LABEL % menu)
            for option in OPTIONS[menu]:
                option_value = bool(settings.get(option, False))
                popup.append(
                    GENERAL_SETTING % {
                        "name": option,
                        "status": MARKED if option_value else UNMARKED,
                        "set": str(not option_value),
                        "class": '.success' if option_value else '.error',
                        "section": menu
                    }
                )

        mdpopups.hide_popup(self.view)
        mdpopups.show_popup(
            self.view,
            ''.join(popup),
            css=css,
            on_navigate=self.on_navigate,
            max_width=1024,
            max_height=1024
        )

    def run(self, edit):
        """Run Command."""

        self.show_popup('Main')