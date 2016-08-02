## Material Theme for Sublime Text 3

For more information on the Material Theme: https://github.com/equinusocio/material-theme

**********************************************************************************************

### Recommended activation
You can activate the theme by using the configurator popup that allow the activation
and the customization through the context menu (right click in your editor and select `Material Theme`),
the `Tools > Material Theme` menu and through the command palette.

Anyaway you can manually activate this theme by these lines in your setting:

```json
"theme": "Material-Theme.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
```

**********************************************************************************************

### Theme variants

**Darker version:**

```
{
  "theme": "Material-Theme-Darker.sublime-theme",
  "color_scheme": "Packages/Material Theme/schemes/Material-Theme-Darker.tmTheme",
}
```

**Lighter version:**

```
{
  "theme": "Material-Theme-Lighter.sublime-theme",
  "color_scheme": "Packages/Material Theme/schemes/Material-Theme-Lighter.tmTheme",
}
```

You can also use Material-Theme-OceanicNext and Material-Theme-Darker-OceanicNext as color_scheme.

**********************************************************************************************

### Other available theme options:

```
"material_theme_small_tab"                : true , // Set small tabs
"material_theme_disable_fileicons"        : true , // Hide sidebar file type icons
"material_theme_disable_folder_animation" : true , // Disable folder animation
"material_theme_small_statusbar"          : true , // Set small status bar
"material_theme_compact_sidebar"          : true , // Set compact side bar
"material_theme_compact_panel"            : true , // Set minimal padding for the search panel
"material_theme_disable_tree_indicator"   : true , // Disable sidebar file indicator
"material_theme_bold_tab"                 : true , // Make the tab labels bolder
"material_theme_tabs_separator"           : true , // Show tabs separator, this disables tab hover animation
"material_theme_accent_lime"              : true , // set green lime accent color
"material_theme_accent_purple"            : true , // set purple accent color
"material_theme_accent_red"               : true , // set pale red accent color
"material_theme_accent_orange"            : true , // set orange accent color
"material_theme_accent_yellow"            : true , // set yellow accent color
"material_theme_accent_indigo"            : true , // set indigo accent color
"material_theme_accent_pink"              : true , // set pink accent color
"material_theme_accent_blue"              : true , // set blue accent color
"material_theme_accent_cyan"              : true , // set cyan accent color
"material_theme_accent_bright-teal"       : true , // set bright-teal accent color
"material_theme_accent_acid-lime"         : true , // set acid-lime accent color
"material_theme_accent_graphite"          : true , // set graphite accent color
"material_theme_accent_brba"              : true , // set Breakind Bad green accent color
"material_theme_accent_sky"               : true , // set Bright-cyan accent color
"material_theme_accent_tomato"            : true , // set Tomato green accent color
"material_theme_panel_separator"          : true , // show bottom panel separator
"material_theme_tabs_autowidth"           : true , // Enable autowidth for tabs
"material_theme_contrast_mode"            : true , // Enable sidebar and panels contrast mode

// If you use Material Theme - Appbar addon you can use additional settings:
"material_theme_tree_headings"            : true , // Show sidebar headings
```

**********************************************************************************************

### Recommended UI and font settings for a better experience:

```
{
  "overlay_scroll_bars": "enabled",
  "line_padding_top": 3,
  "line_padding_bottom": 3,
  "always_show_minimap_viewport": true,
  "bold_folder_labels": true,
  "indent_guide_options": [ "draw_normal", "draw_active" ],   // Highlight active indent
  "font_options": [ "gray_antialias" ],                       // For retina Mac
}
```

