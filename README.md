# Material Theme for Sublime Text 3
This theme brings the [Material Design](http://www.google.com/design/) visual language to your Sublime Text 3. If you have problems report them with an [issue](https://github.com/equinusocio/material-theme/issues).


<!-- ### Easy installation
You can install this awesome theme through the [Package Control](https://packagecontrol.io/installation). Search for *"Material Theme"*, install, **restart Sublime Text** and enjoy! -->


#### Manual installation
1. Download the [latest release](https://github.com/equinusocio/material-theme/releases/latest), extract and rename the folder to "material-theme".

2. Move the folder inside your sublime Packages directory. (Preferences > Browse packages...)

3. Activate the theme with the following preferences:

```json
"theme": "Material-Theme.sublime-theme",
"color_scheme": "Packages/material-theme/schemes/Material-Theme.tmTheme",
```

***Note*** : Remember to restart Sublime Text after activating the theme.


## Theme styles
This theme provides two style versions. If you don't like the default white panels and field inputs you can set the darker version by using this:

```json
"theme": "Material-Theme-Darker.sublime-theme",
```

## Recommended UI and font settings
I suggest you to use this custom settings for a better experience with the theme:

```json
"overlay_scroll_bars": "enabled",
"line_padding_top": 3,
"line_padding_bottom": 3,
"font_options": [ "gray_antialias" ],
"always_show_minimap_viewport": true,
"bold_folder_labels": true
```

The font used for the code is "[Fira Code](https://github.com/tonsky/FiraCode)" with code ligatures.


## Thanks
- [@Riccardo-Zanutta](https://github.com/Riccardo-Zanutta) for the windows beta test, site development and support.
- [@irazasyed](https://github.com/irazasyed)