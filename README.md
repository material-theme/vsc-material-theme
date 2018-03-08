
<p align="center"><img width="980px" src="https://image.ibb.co/mGCtnn/Material_Theme.gif"></p>

[![Twitter](https://img.shields.io/twitter/url/https/github.com/equinusocio/vsc-material-theme.svg?style=flat-square)](https://twitter.com/intent/tweet?text=This%20is%20the%20most%20epic%20theme:&url=https%3A%2F%2Fgithub.com%2Fequinusocio%2Fvsc-material-theme)
[![GitHub tag](https://img.shields.io/github/release/equinusocio/vsc-material-theme.svg?style=flat-square)](https://github.com/equinusocio/vsc-material-theme/releases)
<a href="https://code.visualstudio.com/updates/v1_19"><img src="https://img.shields.io/badge/VS_Code-v1.19+-373277.svg?style=flat-square"/></a> <a href="https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme"><img src="https://vsmarketplacebadge.apphb.com/installs/Equinusocio.vsc-material-theme.svg?style=flat-square"/></a>


The most epic theme meets Visual Studio Code. You can help by reporting issues [here](https://github.com/equinusocio/vsc-material-theme/issues)

<!-- TOC -->

- [Getting started](#getting-started)
    - [Installation](#installation)
            - [Packaged VSIX Extension](#packaged-vsix-extension)
                - [GitHub Repository Clone](#github-repository-clone)
    - [Activate theme](#activate-theme)
    - [Activate File Icons](#activate-file-icons)
    - [Set the accent color](#set-the-accent-color)
    - [Override theme colors](#override-theme-colors)
- [Recommended settings for a better experience](#recommended-settings-for-a-better-experience)
- [Other resources](#other-resources)
    - [Contributors](#contributors)
    - [Backers](#backers)
    - [Sponsors](#sponsors)

<!-- /TOC -->

<details>
    <summary>Screenshots</summary>
    <p align="center">
    <img src="https://image.ibb.co/jUrdnn/material_theme_lighter.png" border="0">
    <img src="https://image.ibb.co/gF6dnn/material_theme_default.png" border="0">
    <img src="https://image.ibb.co/gSW007/material_theme_darker.png" border="0">
    <img src="https://image.ibb.co/jnBdnn/material_theme_palenight.png" border="0">
    </p>
</details>

# Getting started

You can install this awesome theme through the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme).

## Installation

Launch *Quick Open*
  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl+P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl+P`

Paste the following command and press `Enter`:

```shell
ext install vsc-material-theme
```

#### Packaged VSIX Extension

[Download the latest .vsix release](https://github.com/equinusocio/vsc-material-theme/releases/latest) file from the GitHub repository and install it from the command line

```shell
code --install-extension vsc-material-theme-*.*.*.vsix
```

or from within VS Code by launching *Quick Open* and running the *Install from VSIX...* command.

##### GitHub Repository Clone

Change to your `.vscode/extensions` [VS Code extensions directory](https://code.visualstudio.com/docs/extensions/install-extension#_side-loading).
Depending on your platform it is located in the following folders:

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> **Linux** `~/.vscode/extensions`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> **macOs** `~/.vscode/extensions`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> **Windows** `%USERPROFILE%\.vscode\extensions`

Clone the Material Theme repository as `Equinusocio.vsc-material-theme`:

```shell
git clone https://github.com/equinusocio/vsc-material-theme.git Equinusocio.vsc-material-theme
```


## Activate theme

Launch *Quick Open*,

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `theme` and choose `Preferences: Color Theme`, then select Material Theme from the list.

This theme provides different color variants, to change the active theme variant type `Material Theme` and choose `Material Theme: Settings`, then select `Change color variant` and pick one theme from the list.

## Activate File Icons

Launch *Quick Open*,

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

type `icon theme` and select `Material Theme Icons` from the drop-down menu.

## Set the accent color

Launch *Quick Open*,

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `Material Theme` and choose `Material Theme: Settings`, then select `Change accent color` and pick one color from the list.

## Override theme colors
You can override the material theme ui and schemes colors by adding these theme-specific settings to your configuration.

```js
"editor.tokenColorCustomizations": {
    "[Material Theme]": {
        "comments": "#229977"
    },
    "..."
},
"workbench.colorCustomizations": {
    "[Material Theme]": {
        "sideBar.background": "#347890"
    },
    "..."
}
```

# Recommended settings for a better experience

```js
{
    // Controls the font family.
    "editor.fontFamily": "Operator Mono",
    // Controls the line height. Use 0 to compute the lineHeight from the fontSize.
    "editor.lineHeight": 24,
    // Enables font ligatures
    "editor.fontLigatures": true,
    // Controls if file decorations should use badges.
    "explorer.decorations.badges": false
}
```

# Other resources
- **AppIcon:** [Download](https://github.com/equinusocio/vsc-material-theme/files/989048/vsc-material-theme-appicon.zip) the official Material Theme app icon for Visual Studio code


## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/vsc-material-theme/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/vsc-material-theme#backer)]

<a href="https://opencollective.com/vsc-material-theme#backers" target="_blank"><img src="https://opencollective.com/vsc-material-theme/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/vsc-material-theme#sponsor)]

<a href="https://opencollective.com/vsc-material-theme/sponsor/0/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/1/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/2/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/3/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/4/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/5/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/6/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/7/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/8/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/vsc-material-theme/sponsor/9/website" target="_blank"><img src="https://opencollective.com/vsc-material-theme/sponsor/9/avatar.svg"></a>

---

<p align="center"> <img src="https://equinusocio.gallerycdn.vsassets.io/extensions/equinusocio/vsc-material-theme/0.0.14/1494970083238/Microsoft.VisualStudio.Services.Icons.Default" width=16 height=16/> Copyright &copy; 2017 Mattia Astorino</p>

<p align="center"><a href="http://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-5E81AC.svg?style=flat-square"/></a> <a href="https://creativecommons.org/licenses/by-sa/4.0"><img src="https://img.shields.io/badge/License-CC_BY--SA_4.0-5E81AC.svg?style=flat-square"/></a></p>
