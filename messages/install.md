## Material Theme for Sublime Text 3

For more information on the Material Theme: https://github.com/equinusocio/material-theme

**********************************************************************************************

# Activate the theme

You can activate this theme from:
- Command palette `Tools > Command Palette` (⌘/Ctrl + ⇧ + P) by typing `Material Theme: Activate theme`.
- Context menu (Right click on the editor) and choose `Material Theme > Activate`
- `Preferences > Packages Settings` and choose `Material Theme > Activate`

You can also manually activate this theme by adding these lines to your user settings (**Preferences > Settings - User**):

```json
"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
"theme": "Material-Theme.sublime-theme",
```

**NOTE:** Restart Sublime Text after activating the theme.

## File icons
From release 4.0.0 this theme use [A File Icon](https://github.com/ihodev/a-file-icon) package to display file icons. Please install the package and restart Sublime Text.

**********************************************************************************************

# Theme options

```json
// Accent
"material_theme_accent_acid-lime"         : true, // Set acid-lime accent color
"material_theme_accent_blue"              : true, // Set blue accent color
"material_theme_accent_brba"              : true, // Set Breaking Bad green accent color
"material_theme_accent_bright-teal"       : true, // Set bright-teal accent color
"material_theme_accent_cyan"              : true, // Set cyan accent color
"material_theme_accent_graphite"          : true, // Set graphite accent color
"material_theme_accent_indigo"            : true, // Set indigo accent color
"material_theme_accent_lime"              : true, // Set lime green accent color
"material_theme_accent_orange"            : true, // Set orange accent color
"material_theme_accent_pink"              : true, // Set pink accent color
"material_theme_accent_purple"            : true, // Set purple accent color
"material_theme_accent_red"               : true, // Set pale red accent color
"material_theme_accent_sky"               : true, // Set bright-cyan accent color
"material_theme_accent_tomato"            : true, // Set tomato red accent color
"material_theme_accent_yellow"            : true, // Set yellow accent color

// Panels
"material_theme_accent_scrollbars"        : true, // Enable accent color for scrollbars
"material_theme_accent_titlebar"          : true, // Enable accent color for titlebar
"material_theme_bright_scrollbars"        : true, // Bright scrollbars puck color
"material_theme_compact_panel"            : true, // Set minimal padding for the search panel
"material_theme_contrast_mode"            : true, // Enable sidebar and panels contrast mode
"material_theme_panel_separator"          : true, // Show bottom panel separator
"material_theme_small_statusbar"          : true, // Set small status bar
"material_theme_titlebar"                 : true, // Enable title bar (OS X 10.10+)

// Sidebar
"material_theme_arrow_folders"            : true, // Replace folder icons with arrows
"material_theme_big_fileicons"            : true, // Show bigger file type icons
"material_theme_bullet_tree_indicator"    : true, // Set a bullet as active tree indicator
"material_theme_compact_sidebar"          : true, // Set compact side bar
"material_theme_disable_fileicons"        : true, // Hide sidebar file type icons
"material_theme_disable_folder_animation" : true, // Disable folder animation
"material_theme_disable_tree_indicator"   : true, // Disable sidebar file indicator

// Tabs
"material_theme_bold_tab"                 : true, // Make the tab labels bolder
"material_theme_small_tab"                : true, // Set small tabs
"material_theme_tabs_autowidth"           : true, // Enable autowidth for tabs
"material_theme_tabs_separator"           : true, // Show tabs separator, this disables tab hover animation

// If you use Material Theme - Appbar addon you can use additional settings:
"material_theme_tree_headings"            : true, // Show sidebar headings
```

**********************************************************************************************

# Recommended settings for a better experience:

```json
"always_show_minimap_viewport" : true,
"bold_folder_labels"           : true,
"font_options"                 : ["gray_antialias", "subpixel_antialias"], // On retina Mac & Windows
"indent_guide_options"         : ["draw_normal", "draw_active"], // Highlight active indent
"line_padding_bottom"          : 3,
"line_padding_top"             : 3,
"overlay_scroll_bars"          : "enabled",
```
