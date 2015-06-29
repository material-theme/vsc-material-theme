# Material Theme for Sublime Text 3
This theme brings the [Material Design](http://www.google.com/design/) visual language to your Sublime Text 3. If you have problems first search for a similiar issue and then report with [new one](https://github.com/equinusocio/material-theme/issues).

## Buy me a beer. (Alcoholist mode ON)

<!-- Pledgie Donation -->
<a href='https://pledgie.com/campaigns/29452'><img alt='Click here to lend your support to: Material Theme donations and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/29452.png?skin_name=chrome' border='0' ></a>

## Screenshots

![image](http://equinusocio.github.io/material-theme/assets/materialtheme.png)

![image](http://equinusocio.github.io/material-theme/assets/materialtheme2.png)

![image](http://equinusocio.github.io/material-theme/assets/materialtheme3.png)

## Easy installation
You can install this awesome theme through the [Package Control](https://packagecontrol.io/installation). Search for *"Material Theme"*, install, **restart Sublime Text** and enjoy!

--

**Manual installation**

1. Download the [latest release](https://github.com/equinusocio/material-theme/releases/latest), extract and rename the folder to **"Material Theme"**.

2. Move the folder inside your sublime Packages directory. **(Preferences > Browse packages...)**

3. Activate the theme with the following preferences at  **(Preferences > Setting - User)**:

```json
"theme": "Material-Theme.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
```

***Note*** : Remember to restart Sublime Text after activating the theme.


## Known issues
Please see the issue [#67](https://github.com/equinusocio/material-theme/issues/67) if you can't see the bottom panel (find/replace, rename, move, can't see the box inputs in SidebarEnhancement, etc..). here the quick fix:

![Drag the top edge](https://cloud.githubusercontent.com/assets/474329/8178894/a0dd09c0-1412-11e5-8ecf-f7f9ade439ae.gif)

## Theme styles
This theme provides a second style version:

#### Darker
```json
"theme": "Material-Theme-Darker.sublime-theme",
"color_scheme": "Packages/Material Theme/schemes/Material-Theme-Darker.tmTheme",
```

#### White panels
If you want to enable the white panels and inputs you can install the addon package through **Package Control**, search for "Material theme white panels".

## Theme options

```json
"material_theme_small_tab": true,  			         // Set small tabs
"material_theme_disable_fileicons": true,          // Hide siderbar file type icons
"material_theme_disable_folder_animation": true,   // Disable folder animation
"material_theme_small_statusbar": true,            // Disable folder animation
``` 

## Recommended UI and font settings
I suggest you to use this custom settings for a better experience with the theme:

```json
"overlay_scroll_bars": "enabled",
"line_padding_top": 3,
"line_padding_bottom": 3,
"font_options": [ "gray_antialias" ], // On retina Mac
"always_show_minimap_viewport": true,
"bold_folder_labels": true,
"indent_guide_options": [ "draw_normal", "draw_active" ], // Highlight active indent
```

The font used for the code is "[Fira Code](https://github.com/tonsky/FiraCode)" with code ligatures (not supported in Sublime Text).

You can also use the official Material Design monospace font, "[Roboto Mono](https://www.google.com/fonts/specimen/Roboto+Mono)"


## Resources

#### App icon
[Download](https://dribbble.com/shots/2104476-Material-Theme-for-Sublime-Text-3/attachments/380650) the official Material Theme icon.

#### Default Color Palette
![Color Palette](http://i.imgur.com/zyIK71j.jpg)


## Thanks
- All donators!
- All contributors 
