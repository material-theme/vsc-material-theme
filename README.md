![Material Theme](http://i.imgur.com/9PyxJMN.gif)

[![GitHub tag](https://img.shields.io/github/tag/equinusocio/material-theme.svg?style=flat-square)](https://github.com/equinusocio/material-theme/releases/latest)
[![GitHub tag](https://img.shields.io/github/release/equinusocio/material-theme.svg?style=flat-square)](https://github.com/equinusocio/material-theme/releases)
[![Downloads](https://img.shields.io/packagecontrol/dt/Material%20Theme.svg?colorB=80d4cd&style=flat-square)](https://packagecontrol.io/packages/Material%20Theme)
[![Package Quality](http://npm.packagequality.com/shield/material-theme.svg?colorB=80d4cd&style=flat-square)](http://packagequality.com/#?package=material-theme)
[![Join the chat at https://gitter.im/equinusocio/material-theme](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/equinusocio/material-theme?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Beerpay](https://beerpay.io/equinusocio/material-theme/make-wish.svg)](https://beerpay.io/equinusocio/material-theme)
[![Beerpay](https://beerpay.io/equinusocio/material-theme/badge.svg?style=flat-square)](https://beerpay.io/equinusocio/material-theme)
<a style="display: inline-block !important;" class="coinbase-button" data-code="977637f29fdd26f9fba47d9acc7f8d57" target="_blank" data-button-style="donation_large" href="https://www.coinbase.com/checkouts/977637f29fdd26f9fba47d9acc7f8d57"><img width="120" src="https://www.coinbase.com/assets/buttons/donation_large-5cf4f17cc2d2ae2f45b6b021ee498297409c94dcf0ba1bbf76fd5668e80b0d02.png"></a><script src="https://www.coinbase.com/assets/button.js" type="text/javascript"></script>


This theme brings the [Material Design](http://www.google.com/design/) visual language to your Sublime Text 3. If you have problems, first search for a similiar issue and then report a [new one](https://github.com/equinusocio/material-theme/issues).

Please read the [Known Issues](https://github.com/equinusocio/material-theme#known-issues) section before reporting a new one. Any issue that does not use the issue template and any issue related to the [known issues section](https://github.com/equinusocio/material-theme#known-issues) will be automatically closed.


# Easy installation
You can install this awesome theme through the [Package Control](https://packagecontrol.io/installation).

1. Press <kbd>cmd/ctrl</kbd> + <kbd>shift</kbd> + <kbd>p</kbd> to open the command palette.
2. Type *"install package"* and press enter. Then search for *"Material Theme"*


# Manual installation

1. Download the [latest release](https://github.com/equinusocio/material-theme/releases/latest), extract and rename the directory to **"Material Theme"**.
2. Move the directory inside your sublime `Packages` directory. **(Preferences > Browse packages...)**


# Activate the theme

You can active this theme from:
- Command palette `Tools > Command Palette` (or <kbd>cmd/ctrl</kbd> + <kbd>↑</kbd> + <kbd>p</kbd>) by typing `Material Theme: Activate theme`. 
- Context menu (Right click on the editor) and choose `Material Theme > Activate Material Theme`
- `Preferences > Packages Settings` and choose `Material Theme > Activate Material Theme`

You can also manually activate this theme by adding these lines to your user settings (**Preferences > Settings - User**):

```json
"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
"theme": "Material-Theme.sublime-theme",
```

**NOTE:** Restart Sublime Text after activating the theme.

# Configuration
This theme provide a visual configuration tool that allow you to configure the theme by activating the available options from an inline popup. Just right click in your editor and choose `Material Theme > Material Theme Config`. You can also open the configurator from the command palette by searching `Material Theme > Configuration`

#### Advanced configuration
If you like the advanced text text-configuration you can use it by the `Material Theme > Advanced configuration` command both from context menu and command palette.

# Known issues
Please see the issue [#67](https://github.com/equinusocio/material-theme/issues/67) if you can't see the bottom panel (find/replace, rename, move, can't see the box inputs in SidebarEnhancement, etc..). here the quick fix:

![Drag the top edge](https://cloud.githubusercontent.com/assets/474329/8178894/a0dd09c0-1412-11e5-8ecf-f7f9ade439ae.gif)

# Addons

#### File icons
From release 4.0.0 this theme use [zz File Icons](https://github.com/oivva/st-file-icons) package to display file icons. Please install the package and restart Sublime Text.

#### App Bar

[Material Theme Appbar](https://github.com/equinusocio/material-theme-appbar)
This official addon enable a beautiful colored tab bar to your Material Theme. The color tint fits automagically the material theme accent color you choosed.

#### White panels

[Material Theme White Panels](https://github.com/equinusocio/material-theme-white-panels)
If you want to enable the white panels and inputs you can install the addon package through **Package Control**, search for "Material theme white panels". You have to disable it if you want to use the ```Lighter``` theme style.


# Theme options

```json
"material_theme_accent_acid-lime"         : true , // Set acid-lime accent color
"material_theme_accent_blue"              : true , // Set blue accent color
"material_theme_accent_brba"              : true , // Set Breaking Bad green accent color
"material_theme_accent_bright-teal"       : true , // Set bright-teal accent color
"material_theme_accent_cyan"              : true , // Set cyan accent color
"material_theme_accent_graphite"          : true , // Set graphite accent color
"material_theme_accent_indigo"            : true , // Set indigo accent color
"material_theme_accent_lime"              : true , // Set lime green accent color
"material_theme_accent_orange"            : true , // Set orange accent color
"material_theme_accent_pink"              : true , // Set pink accent color
"material_theme_accent_purple"            : true , // Set purple accent color
"material_theme_accent_red"               : true , // Set pale red accent color
"material_theme_accent_sky"               : true , // Set bright-cyan accent color
"material_theme_accent_tomato"            : true , // Set tomato red accent color
"material_theme_accent_yellow"            : true , // Set yellow accent color
"material_theme_bold_tab"                 : true , // Make the tab labels bolder
"material_theme_compact_panel"            : true , // Set minimal padding for the search panel
"material_theme_compact_sidebar"          : true , // Set compact side bar
"material_theme_contrast_mode"            : true , // Enable sidebar and panels contrast mode
"material_theme_disable_fileicons"        : true , // Hide sidebar file type icons
"material_theme_arrow_folders"            : true , // Replace folder icons with arrows
"material_theme_big_fileicons"            : true , // Show bigger file type icons
"material_theme_disable_folder_animation" : true , // Disable folder animation
"material_theme_disable_tree_indicator"   : true , // Disable sidebar file indicator
"material_theme_bullet_tree_indicator"    : true , // Set a bullet as active tree indicator
"material_theme_panel_separator"          : true , // Show bottom panel separator
"material_theme_small_statusbar"          : true , // Set small status bar
"material_theme_small_tab"                : true , // Set small tabs
"material_theme_bright_scrollbars"        : true , // Bright scrollbars puck color
"material_theme_accent_scrollbars"        : true , // Enable accent color for scrollbars
"material_theme_tabs_autowidth"           : true , // Enable autowidth for tabs
"material_theme_tabs_separator"           : true , // Show tabs separator, this disables tab hover animation

// If you use Material Theme - Appbar addon you can use additional settings:
"material_theme_tree_headings"            : true , // Show sidebar headings
```

# Recommended settings for a better experience:

```json
"always_show_minimap_viewport" : true,
"bold_folder_labels"           : true,
"font_options"                 : [ "gray_antialias", "subpixel_antialias" ],    // On retina Mac & Windows
"indent_guide_options"         : [ "draw_normal", "draw_active" ],   // Highlight active indent
"line_padding_bottom"          : 3,
"line_padding_top"             : 3,
"overlay_scroll_bars"          : "enabled",
```

The font used for the code is "[Operator Mono](http://www.typography.com/blog/introducing-operator)"

You can also use the official Material Design monospace font "[Roboto Mono](https://www.google.com/fonts/specimen/Roboto+Mono)" or "[Fira Code](https://github.com/tonsky/FiraCode)".

# Contributing

This UI theme uses a custom compiler build on Gulp and JS. If you want to edit the UI you must first install the compiler:

```
$ npm install
```
then run compiler and watcher by run:

```
$ gulp
```
You can now edit the source files under `/src` folder that will be compiled inside the root folder (don't edit compiled files).

# Other Resources

**App icon**: [Download](https://github.com/equinusocio/material-theme/files/396220/Material-Theme-Icon.zip) the official Material Theme icon.

# Official Portings
Material Theme was also ported to:


- Atom Editor: [atom-material-ui](https://github.com/silvestreh/atom-material-ui) (by [@silvestreh](https://github.com/silvestreh)) and [material-ui](https://github.com/leo/material-ui) (by [@leo](https://github.com/leo))
- [IntelliJ IDEA](https://github.com/ChrisRM/material-theme-jetbrains) (thanks to [@ChrisRM](https://github.com/ChrisRM)).
- [Vim](https://github.com/kristijanhusak/vim-hybrid-material) (thanks to [@kristijanhusak](https://github.com/kristijanhusak)).
- [Terminal OSX](https://gist.github.com/mvaneijgen/4c56701215847dd5ddcf) (thanks to [@mvaneijgen](https://github.com/mvaneijgen)).
- [iTerm2](https://gist.github.com/Revod/3f3115f8d4b90fc986fd4b61441c2567) (thanks to [@Revod](https://github.com/Revod)).
- [ConEmu](https://gist.github.com/rajadain/b306b2ba71bd58a1df41) (thanks to [@rajadain](https://github.com/rajadain)).
- [Slack App](https://slack.com/) ( #263238,#2e3a40,#80CBC4,#FFFFFF,#13191C,#ffffff,#50fa7b,#FF5555 )
- [Nylas N1](https://github.com/jackiehluo/n1-material) (thanks to [@jackiehluo](https://github.com/jackiehluo))


# Color Schemes palettes

Color             | Default / Darker |  Lighter   |
---               | ---              |  ---       |
Red               | `#FF5370`        |  `#E53935` |
Pink              | `#f07178`        |  `#FF5370` |
Orange            | `#F78C6C`        |  `#F76D47` |
Yellow            | `#FFCB6B`        |  `#FFB62C` |
Green             | `#C3E88D`        |  `#91B859` |
Pale Blue         | `#B2CCD6`        |  `#8796B0` |
Cyan              | `#89DDFF`        |  `#39ADB5` |
Blue              | `#82AAFF`        |  `#6182B8` |
Purple            | `#C792EA`        |  `#7C4DFF` |
Violet            | `#bb80b3`        |  `#945EB8` |
Brown             | `#ab7967`        |  `#ab7967` |



## Thanks
Thanks for all the [contributors](https://github.com/equinusocio/material-theme/graphs/contributors).

Check the video review by **LevelUpTuts**

# Video review
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/6eqgrCxprOI/0.jpg)](http://www.youtube.com/watch?v=6eqgrCxprOI)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/equinusocio/material-theme/badge.svg?style=beer-square)](https://beerpay.io/equinusocio/material-theme)  [![Beerpay](https://beerpay.io/equinusocio/material-theme/make-wish.svg?style=flat-square)](https://beerpay.io/equinusocio/material-theme?focus=wish)
