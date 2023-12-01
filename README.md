
# Material Theme [<img src="https://rawcdn.githack.com/material-theme/vsc-material-theme/790fc5d2872f10d5a903f449c90c1fa1502d7e53/logo.png" alt="Material Theme" width="90" height="90" align="right">](https://material-theme.site/)
>Original colors, original taste.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)

## Table of contents

The most epic theme meets Visual Studio Code.

- [Material Theme ](#material-theme-)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Installation](#installation)
  - [Activate theme](#activate-theme)
  - [Set the accent color](#set-the-accent-color)
  - [Override theme colors](#override-theme-colors)
  - [Recommended settings for a better experience](#recommended-settings-for-a-better-experience)
  - [Official Portings](#official-portings)
  - [Want to use the legacy version?](#want-to-use-the-legacy-version)
  - [Contributors](#contributors)
  - [Backers](#backers)
  - [Sponsors](#sponsors)

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Getting started

You can install this awesome theme through the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme). <a href="https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme#review-details"><img src="https://img.shields.io/badge/marketplace-gray.svg?colorA=655BE1&colorB=4F44D6&style=flat-square"/></a>

### Installation

Launch *Quick Open*:
  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl+P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl+P`

Paste the following command and press `Enter`:

```shell
ext install equinusocio.vsc-material-theme
```

And pick the one by **Mattia Astorino (Equinusocio)** as author.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Activate theme

Launch *Quick Open*:

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `theme`, choose `Preferences: Color Theme`, and select one of the Material Theme variants from the list. After activation, the theme will set the correct icon theme based on your active theme variant.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Set the accent color

Launch *Quick Open*:

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `material theme`, choose `Material Theme: Set accent color`, and pick one color from the list.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Override theme colors

Learn how to customize every part of this theme by using Visual Studio Code API. [Read more.](https://github.com/material-theme/vsc-material-theme/discussions/1274)

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)

## Recommended settings for a better experience

```js
{
    // Controls the line height. Use 0 to compute the lineHeight from the fontSize.
    "editor.lineHeight": 28,
    // Enables font ligatures
    "editor.fontLigatures": "'ss01','ss05','dlig'",
    // Controls if file decorations should use badges.
    "explorer.decorations.badges": false
}
```

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Official Portings

You can find all the official portings and resources [here](https://github.com/material-theme/vsc-material-theme/discussions/1279).

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)


## Want to use the legacy version?

If you're looking for the deprecated Community Material Theme [you can find it here](https://github.com/material-theme/vsc-material-theme/discussions/1278). This version has been deprecated and removed from the official marketplace.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmineblocks.com%2F1%2Fwiki%2Fimages%2F5%2F59%2FEmpty.png&f=1&nofb=1&ipt=272d1bf6ef886b68f90fc4b76685cf3d69c29691db2a6136a83a4f99e53db919&ipo=images)

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/material-theme/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/material-theme#backer)]

<a href="https://opencollective.com/material-theme#backers" target="_blank"><img src="https://opencollective.com/material-theme/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/material-theme#sponsor)]

<a href="https://opencollective.com/material-theme/sponsor/0/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/1/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/2/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/3/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/4/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/5/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/6/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/7/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/8/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/material-theme/sponsor/9/website" target="_blank"><img src="https://opencollective.com/material-theme/sponsor/9/avatar.svg"></a>

---

<p align="center"> <img src="https://equinusocio.gallerycdn.vsassets.io/extensions/material-theme/vsc-material-theme/0.0.14/1494970083238/Microsoft.VisualStudio.Services.Icons.Default" width=16 height=16/> Copyright &copy; 2019 Mattia Astorino & Alessio Occhipinti</p>

<p align="center"><a href="http://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-5E81AC.svg?style=flat-square"/></a></p>
