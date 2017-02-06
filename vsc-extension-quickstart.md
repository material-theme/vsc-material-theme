# Welcome to your VS Code Extension

## What's in the folder
* This folder contains all of the files necessary for your color theme extension
* `package.json` - this is the manifest file that defines the location of the theme file
and specifies the base theme of the theme
* `themes/Material-Theme-Darker.tmTheme` - the color theme definition file

## Get up and running straight away
* press `F5` to open a new window with your extension loaded
* open `File > Preferences > Color Themes` and pick your color theme

## Make changes
* you can relaunch the extension from the debug toolbar after making changes to the files listed above
* you can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes

## Adopt your theme to Visual Studio Code
* VS Code themes are standard TextMate themes. It's recommended to stick to the TextMate conventions and avoid language
specific rules in your theme as grammars can also be replaced by extensions.
To learn about what scopes are used where, check out the [TextMate documentation](https://manual.macromates.com/en/themes)
and this useful [blog post](http://www.apeth.com/nonblog/stories/textmatebundle.html). A great place to examine themes is [here](https://tmtheme-editor.herokuapp.com/#!/editor/theme/Monokai).
* Besides coloring syntax tokens, VS Code uses the following editor color settings from the textmate file:

  * `caret`: Color of the carret.
  * `lineHighlight`: Background color of line highlight.
  * `selection`: Background color of selections.
  * `rangeHighlight`: Background color of range highlighted, used by Quick Open and Find features.
  * `selectionHighlight`: Background color of regions highlighted while selecting.
  * `inactiveSelection`: Background color of selections when not in focus.
  * `wordHighlight`: Background color of a symbol during read-access, like reading a variable.
  * `wordHighlightStrong`: Background color of a symbol during write-access, like writing to a variable.
  * `findMatchHighlight`: Background color of regions matching the search.
  * `currentFindMatchHighlight`: Background color of the current region matching the search.
  * `findRangeHighlight`: Background color of regions selected for search.
  * `activeLinkForeground`: Color of active links.
  * `hoverHighlight`: Background color when hovered.
  * `referenceHighlight`: Background color of a reference when finding all references.
  * `invisible`: Color of the whitespace symbols.
  * `guide`: Color of the indentation guides which indicate nesting levels.

## Install your extension
* To start using your extension with Visual Studio Code copy it into the <user home>/.vscode/extensions folder and restart Code.
* To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.