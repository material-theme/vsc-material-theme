
<p align="center"><img width="800px" src="https://i.ibb.co/LzRwxp4/Frame.jpg"></p>
<p align="center">
<a href="https://code.visualstudio.com/updates/v1_25"><img src="https://vsmarketplacebadge.apphb.com/rating-star/Equinusocio.vsc-material-theme.svg?style=for-the-badge&colorA=FBBD30&colorB=F2AA08"/></a> <a href="https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme"><img src="https://vsmarketplacebadge.apphb.com/downloads-short/Equinusocio.vsc-material-theme.svg?style=for-the-badge&colorA=5DDB61&colorB=4BC74F&label=DOWNLOADS"/></a> <a href="https://a.paddle.com/v2/click/16413/37697?link=1227"><img src="https://img.shields.io/badge/Supported%20by-VSCode%20Power%20User%20Course%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/></a>
</p>



The most epic theme meets Visual Studio Code. You can help by reporting issues [here](https://github.com/equinusocio/vsc-material-theme/issues).

- [Getting started](#getting-started)
  - [Installation](#installation)
    - [Packaged VSIX Extension](#packaged-vsix-extension)
      - [GitHub Repository Clone](#github-repository-clone)
- [Activate theme](#activate-theme)
- [Set the accent color](#set-the-accent-color)
- [Override theme colors](#override-theme-colors)
  - [Color Scheme override](#color-scheme-override)
- [Recommended settings for a better experience](#recommended-settings-for-a-better-experience)
- [Official Portings](#official-portings)
- [Other resources](#other-resources)
- [Contributors](#contributors)
- [Backers](#backers)
- [Sponsors](#sponsors)


## Getting started

You can install this awesome theme through the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme).

### Installation

Launch *Quick Open*:
  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl+P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl+P`

Paste the following command and press `Enter`:

```shell
ext install material theme
```

And pick the one by **Mattia Astorino** (me) as author.

#### Packaged VSIX Extension

[Download the latest .vsix release](https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Equinusocio/vsextensions/vsc-material-theme/latest/vspackage) file from the marketplace and install it from the command line

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

Launch *Quick Open*:

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `theme`, choose `Preferences: Color Theme`, and select one of the Material Theme variants from the list. After activation, the theme will set the correct icon theme based on your active theme variant.

## Set the accent color

Launch *Quick Open*:

  - <img src="https://www.kernel.org/theme/images/logos/favicon.png" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">Linux</a> `Ctrl + Shift + P`
  - <img src="https://developer.apple.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf">macOS</a> `⌘ + Shift + P`
  - <img src="https://www.microsoft.com/favicon.ico" width=16 height=16/> <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf">Windows</a> `Ctrl + Shift + P`

Type `material theme`, choose `Material Theme: Set accent color`, and pick one color from the list.


## Override theme colors
You can override the Material Theme UI and schemes colors by adding these theme-specific settings to your configuration. For advanced customisation please check the [relative section on the VS Code documentation](https://code.visualstudio.com/docs/getstarted/themes#_customizing-a-color-theme).

### Color Scheme override

**Basic example**
```js
"editor.tokenColorCustomizations": {
    "[Material Theme]": {
        "comments": "#229977"
    }
},
```

**Advanced example**

```js
"editor.tokenColorCustomizations": {
    "[Material Theme VARIANT]": {
        "sideBar.background": "#347890",
        "textMateRules": [
            {
                "scope": [
                    "punctuation.definition.comment",
                    "comment.block",
                    "comment.line",
                    "comment.block.documentation"
                ],
                "settings": {
                    "foreground": "#FF0000"
                }
            }
        ]
    },
},
```

## Recommended settings for a better experience

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

## Official Portings
Thanks to the Material Theme community you can use is with other softwares, here the official portings:

- Atom Editor: [atom-material-ui](https://github.com/silvestreh/atom-material-ui) (by [@silvestreh](https://github.com/silvestreh))
- [IntelliJ IDEA](https://github.com/ChrisRM/material-theme-jetbrains) (thanks to [@ChrisRM](https://github.com/ChrisRM) and [@mallowigi](https://github.com/mallowigi)).
- [Vim](https://github.com/hzchirs/vim-material) (thanks to [@hzchirs](https://github.com/hzchirs)).
- [Terminal OSX](https://gist.github.com/mvaneijgen/4c56701215847dd5ddcf) (thanks to [@mvaneijgen](https://github.com/mvaneijgen)).
- [iTerm2](https://gist.github.com/Revod/3f3115f8d4b90fc986fd4b61441c2567) (by [@Revod](https://github.com/Revod)) and [iTerm2 Palenight](https://github.com/JonathanSpeek/palenight-iterm2) (by [@jonathanspeek](https://github.com/jonathanspeek)).
- [Hyper](https://github.com/equinusocio/hyper-material-theme).
- [ConEmu](https://gist.github.com/rajadain/b306b2ba71bd58a1df41) (thanks to [@rajadain](https://github.com/rajadain)).
- [Slack App](https://slack.com/) ( #263238,#2e3a40,#80CBC4,#FFFFFF,#13191C,#ffffff,#50fa7b,#FF5555 )
- [Nylas N1](https://github.com/jackiehluo/n1-material) (thanks to [@jackiehluo](https://github.com/jackiehluo))
- [Base16](https://github.com/ntpeters/base16-materialtheme-scheme) (by [@ntpeters](https://github.com/ntpeters))
- [Bear Notes](https://github.com/r3volution11/material-theme-bear-notes) (by [@r3volution11](https://github.com/r3volution11))

## Other resources
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

<p align="center"> <img src="https://equinusocio.gallerycdn.vsassets.io/extensions/equinusocio/vsc-material-theme/0.0.14/1494970083238/Microsoft.VisualStudio.Services.Icons.Default" width=16 height=16/> Copyright &copy; 2019 Mattia Astorino & Alessio Occhipinti</p>

<p align="center"><a href="http://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache_2.0-5E81AC.svg?style=flat-square"/></a></p>
