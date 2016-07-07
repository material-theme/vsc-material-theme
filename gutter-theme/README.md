# [![Boxy - The Best Sublime Text 3 Theme of 2016][img-name]][theme-downloads]

[![Downloads][img-downloads]][downloads]
[![Click here to lend your support to: Boxy and make a donation at patreon.com !][img-patreon]][patreon]&nbsp;
[![Click here to lend your support to: Boxy and make a donation at flattr.com !][img-flattr]][flattr]&nbsp;
[![Click here to lend your support to: Boxy and make a donation at bitcoin.com !][img-bitcoin]][bitcoin]

This [Boxy][theme] addon enables you to change the appearance of the [SublimeLinter][linter].

![Boxy Sublime Linter Theme][img-linter]

Want to learn more? [**See the wiki &#8594;**][wiki].

## Get It

### Package Control

The easiest way to install is using [Package Control][pc], where [it][downloads] is listed as `Boxy Theme Addon - Linter Theme`.

1. Open `Command Palette` using menu item `Tools → Command Palette...`
2. Choose `Package Control: Install Package`
3. Find `Boxy Theme Addon - Linter Theme` and hit `Enter`

### Manual

You can also install the theme addon manually:

#### Default

1. [Download the .zip][releases]
2. Unzip and rename the folder to `Boxy Theme Addon - Linter Theme`
3. Copy the folder into `Packages` directory, which you can find using the menu item `Preferences → Browse Packages...`

#### Preferred

This is the preferred method, because you'll be able to upgrade theme addon package via [Package Control][pc].

1. Go to `Packages` directory, which you can find using the menu item `Preferences → Browse Packages...`
2. Clone repository here: `git clone https://github.com/oivva/boxy-addon-linter-theme.git "Boxy Theme Addon - Linter Theme"`

## Activation

Activate the SublimeLinter gutter theme by modifying plugin's preferences file, which you can find using the menu item `Preferences → Package Settings → SublimeLinter → Settings - User`.

![SublimeLinter Theme Activation][img-linter-activation]

```js
"gutter_theme": "Packages/Boxy Theme Addon - Linter Theme/Boxy.gutter-theme",
```

<!-- Links -->

[theme]: https://github.com/oivva/boxy
[theme-downloads]: https://packagecontrol.io/packages/Boxy%20Theme
[releases]: https://github.com/oivva/boxy-addon-linter-theme/releases
[downloads]: https://packagecontrol.io/packages/Boxy%20Theme%20Addon%20-%20Linter%20Theme
[patreon]: https://www.patreon.com/oivva "Donate with Patreon"
[flattr]: https://flattr.com/profile/oivva "Donate with Flattr"
[bitcoin]: https://www.coinbase.com/oivva "Donate with Bitcoin"
[wiki]: https://github.com/oivva/boxy/wiki
[pc]: https://sublime.wbond.net
[linter]: https://github.com/SublimeLinter/SublimeLinter3
[pr]: https://github.com/wbond/package_control_channel/pull/5575

<!-- Images -->

[img-name]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/readme/name.png
[img-downloads]: https://img.shields.io/packagecontrol/dt/Boxy%20Theme%20Addon%20-%20Linter%20Theme.svg?maxAge=3600
[img-patreon]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/readme/patreon.png
[img-flattr]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/readme/flattr.png
[img-bitcoin]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/readme/bitcoin.png
[img-linter]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/wiki/gallery/default/tomorrow.png
[img-linter-activation]: https://raw.githubusercontent.com/oivva/boxy-extras/master/assets/readme/linter-theme-activation.png
