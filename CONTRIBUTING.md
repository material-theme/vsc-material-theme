Contributing guidelines
=======================

> Note: this document is intended as a draft, it will be updated soon

### Requirements:

* Nodejs ^6.x
* Visual Studio Code
* GPG Tool

<!-- TOC -->

        - [Requirements:](#requirements)
        - [Decrypt content](#decrypt-content)
- [or](#or)

<!-- /TOC -->
### Decrypt content
We use git-crypt to encrypt compiler files. To contribute you need a GPG key public/private associated with your github email.

1. Export your public key by running

```gpg --output PATH/FILENAME.gpg --export ASSOCIATEDEMAIL```

2. Send the exported `.gpg` file to a contributor that will add you to the trusted people.
3. Fetch and pull then decrypt files with `git-crypt unlock` entering your key password.

### Installing and compiling source

First you will have to install node_modules through npm or yarn

```shell
npm install
# or
yarn install
```

To compile to the source code, you have to execute the build task through visual studio code.
First you need to invoke to quick command (on MacOS `⌘P`, while on Linux/windows is `ctrl+p`)
then type `task build` and wait until vsc will have finished the task.

### Testing the theme

To test the theme, you will have to go to the debug section, select the *Launch Extension* from debug and execute it.

### Adding new Material Theme commands

Soon(ish)®

### Adding new icons

* Add your icon to the `~/src/icons/svgs` directory.

* Add the reference to that icon to the `~/src/icons/partials/fileNames.js` or if your icon is referred to a directory adds the reference to the `~/src/icons/partials/folderNames.js` file, otherwise to `~/src/icons/partials/fileExtensions.js` if is referred to a file extension.

* If you want to make the icon sensitive to be accented, modify the `~/extensions/defaults.json` file, adding the icon definition to the `accentableIcons` array (e.g. ["_folder_open", "_folder_open_build"]) and the path to the `icons.theme.iconDefinitions` object. The same applies to variants (the variant icons array is called "variantsIcons")

* Execute the build command.

* Enjoy your new icons in Material Theme, and don't forget to pull request!
