[![GitHub tag](https://img.shields.io/github/tag/equinusocio/material-theme.svg?style=flat-square)](https://github.com/equinusocio/material-theme/releases/latest)
[![GitHub tag](https://img.shields.io/github/release/equinusocio/material-theme.svg?style=flat-square)](https://github.com/equinusocio/material-theme/releases)
[![Downloads](https://img.shields.io/packagecontrol/dt/Material%20Theme.svg?colorB=80d4cd&style=flat-square)](https://packagecontrol.io/packages/Material%20Theme)
[![Join the chat at https://gitter.im/equinusocio/material-theme](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/equinusocio/material-theme?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<!-- Pledgie Donation -->
<a href='https://pledgie.com/campaigns/29452'><img alt='Click here to lend your support to: Material Theme donations and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/29452.png?skin_name=chrome' border='0' ></a>


# Material Theme for Sublime Text 3 3085+

This theme brings the [Material Design](http://www.google.com/design/) visual language to your Sublime Text 3. If you have problems first search for a similiar issue and then report with [new one](https://github.com/equinusocio/material-theme/issues).

Please read the [Known Issues](https://github.com/equinusocio/material-theme#known-issues) section before send a new one.

## Screenshots

![Material Theme](http://equinusocio.github.io/material-theme/assets/multi.jpg)

More screenshots [here](http://equinusocio.github.io/material-theme/)

## Easy installation
You can install this awesome theme through the [Package Control](https://packagecontrol.io/installation). Search for *"Material Theme"*.

--

## Manual installation

1. Download the [latest release](https://github.com/equinusocio/material-theme/releases/latest), extract and rename the folder to **"Material Theme"**.

2. Move the folder inside your sublime Packages directory. **(Preferences > Browse packages...)**


## Activate the theme

Activate the theme with the following preferences at  **(Preferences > Setting - User)**:

```json
"theme": "Material-Theme.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
```

***Note*** : Remember to restart Sublime Text after activating the theme.

## Theme styles
This theme provides 2 alternative styles:

**Darker**
```json
"theme": "Material-Theme-Darker.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme-Darker.tmTheme",
```

**Lighter**
```json
"theme": "Material-Theme-Lighter.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme-Lighter.tmTheme",
```

**Oceanic Next Color Schemes**

If you don't like material theme color schemes you can use Oceanic Next that is provided with package by using:

*default*
```json
"color_scheme": "Packages/Material Theme/schemes/Material-Theme-OceanicNext.tmTheme",
```

*Darker*
```json
"color_scheme": "Packages/Material Theme/schemes/Material-Theme-Darker-OceanicNext.tmTheme",
```

**Old Color Schemes**

You can still use the oldest and **unsupported** color schemes (with red variables) 

```json
"color_scheme": "Packages/Material Theme/schemes/OLD/Material-Theme.tmTheme",
"color_scheme": "Packages/Material Theme/schemes/OLD/Material-Theme-Darker.tmTheme",
"color_scheme": "Packages/Material Theme/schemes/OLD/Material-Theme-Lighter.tmTheme",
```

## Known issues
Please see the issue [#67](https://github.com/equinusocio/material-theme/issues/67) if you can't see the bottom panel (find/replace, rename, move, can't see the box inputs in SidebarEnhancement, etc..). here the quick fix:

![Drag the top edge](https://cloud.githubusercontent.com/assets/474329/8178894/a0dd09c0-1412-11e5-8ecf-f7f9ade439ae.gif)

## Addons

#### White panels
If you want to enable the white panels and inputs you can install the addon package through **Package Control**, search for "Material theme white panels". You have to disable it if you want to use the ```Lighter``` theme style.

## Theme options

```json
"material_theme_small_tab"                : true , // Set small tabs
"material_theme_disable_fileicons"        : true , // Hide siderbar file type icons
"material_theme_disable_folder_animation" : true , // Disable folder animation
"material_theme_small_statusbar"          : true , // Set small status bar
"material_theme_compact_sidebar"          : true , // Set small status bar
"material_theme_disable_tree_indicator"   : true , // Disable sidebar file indicator
"material_theme_bold_tab"                 : true , // Make the tab labels bolder
"material_theme_tabs_separator"           : true , // Show tabs separator, this disable tab animation hover
"material_theme_accent_lime"              : true , // set green lime accent color
"material_theme_accent_purple"            : true , // set purple accent color
"material_theme_accent_red"               : true , // set pale red accent color
"material_theme_accent_orange"            : true , // set orange accent color
"material_theme_accent_yellow"            : true , // set yellow accent color
"material_theme_panel_separator"          : true , // show bottom panel separator
"material_theme_tabs_autowidth"           : true , // Enable autowidth for tabs
"material_theme_contrast_mode"            : true , // Enable sidebar and panels contrast mode
```

## Recommended UI and font settings for a better experience:

```json
"overlay_scroll_bars"          : "enabled",
"line_padding_top"             : 3,
"line_padding_bottom"          : 3,
"always_show_minimap_viewport" : true,
"bold_folder_labels"           : true,
"indent_guide_options"         : [ "draw_normal", "draw_active" ],   // Highlight active indent
"font_options"                 : [ "gray_antialias" ],                      // On retina Mac
```

The font used for the code is "[Fira Code](https://github.com/tonsky/FiraCode)" with code ligatures (not supported in Sublime Text).

You can also use the official Material Design monospace font, "[Roboto Mono](https://www.google.com/fonts/specimen/Roboto+Mono)"

## Theme compiler

This UI theme use a custom compiler build on Gulp and JS. If you want to edit the UI you must first install the compiler:
```
$ npm install
```
then run compiler and watcher by run:
```
$ gulp
```
You can now edit the source files under `/src` folder that will be compiled inside the root folder (don't edit compiled files.)

## Other Resources

**App icon**

[Download](https://dribbble.com/shots/2104476-Material-Theme-for-Sublime-Text-3/attachments/380650) the official Material Theme icon.

## Other Editors
Material Theme was also ported to:


- [x] Atom Editor: [atom-material-ui](https://github.com/silvestreh/atom-material-ui) and [material-ui](https://github.com/leo/material-ui)
- [x] [IntelliJ IDEA](https://github.com/ChrisRM/material-theme-jetbrains) (thanks to [@ChrisRM](https://github.com/ChrisRM)).
- [x] [Vim](https://github.com/kristijanhusak/vim-hybrid-material) (thanks to [@kristijanhusak](https://github.com/kristijanhusak)).
- [x] [Terminal OSX](https://gist.github.com/mvaneijgen/4c56701215847dd5ddcf) (thanks to [@mvaneijgen](https://github.com/mvaneijgen)).
- [x] [ConEmu](https://gist.github.com/rajadain/b306b2ba71bd58a1df41) (thanks to [@rajadain](https://github.com/rajadain)).


## Default Color Palette

![Color Palette](http://i.imgur.com/zyIK71j.jpg)


## Thanks
Thanks for all the [contributors](https://github.com/equinusocio/material-theme/graphs/contributors).

Check the video review by **LevelUpTuts**

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/6eqgrCxprOI/0.jpg)](http://www.youtube.com/watch?v=6eqgrCxprOI)
