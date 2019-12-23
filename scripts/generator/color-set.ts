import {IColorSet} from '@moxer/vscode-theme-generator';
import {ThemeSetting} from './types';

export const getColorSet = (theme: ThemeSetting): IColorSet => {
  return {
    base: {
      // Determines the overall background color
      background: theme.scheme.background,
      // Determines boolean, identifier, keyword, storage, and cssClass
      color1: theme.scheme.base.red,
      // Determines string, stringEscape, and cssId
      color2: theme.scheme.base.green,
      // Determines function, class, classMember, type, and cssTag
      color3: theme.scheme.base.yellow,
      // Determines functionCall and number
      color4: theme.scheme.base.paleblue,
      // Determines the overall text foreground color
      foreground: theme.scheme.base.white
    },
    /**
    * Overrides workbench UI Elements
    */
    workbench: {
      /**
      * General elements style
      */
      focusBorder: `${theme.scheme.background}00`,
      'widget.shadow': `${theme.scheme.background}00`,
      'selection.background': `${theme.scheme.base.paleblue}50`,
      'scrollbar.shadow': `${theme.scheme.background}00`,
      'editorLink.activeForeground': theme.scheme.foreground,
      'progressBar.background': theme.scheme.base.yellow,
      'debugToolBar.background': theme.scheme.background,
      'pickerGroup.foreground': theme.scheme.base.yellow,
      'editorMarkerNavigation.background': `${theme.scheme.foreground}05`,
      // 'tree.indentGuidesStroke': theme.scheme.shade1,
      'terminalCursor.foreground': theme.scheme.base.yellow,
      'terminalCursor.background': theme.scheme.base.black,
      /**
      * Buttons style
      */
      'button.background': theme.scheme.background,
      // 'button.hoverBackground': theme.scheme.shade2,
      /**
      * Links style
      */
      'textLink.foreground': theme.scheme.base.cyan,
      'textLink.activeForeground': theme.scheme.base.yellow,
      /**
      * Sidebar style
      */
      'sideBar.background': theme.scheme.background,
      // 'sideBar.foreground': theme.scheme.shade4,
      // 'sideBar.border': themeSchemeShade2,
      /**
      * Sidebar elements style
      */
      // 'sideBarTitle.foreground': theme.scheme.shade4,
      'sideBarSectionHeader.background': theme.scheme.background,
      // "sideBarSectionHeader.foreground": theme.scheme.foreground,
      'sideBarSectionHeader.border': theme.scheme.background,
      /**
      * Window panels style (terminal, global search)
      */
      'panel.background': theme.scheme.background,
      // 'panel.border': theme.scheme.borders,
      // 'panel.dropBackground': theme.scheme.shade2,
      /**
      * Window panels elements style
      */
      // 'panelTitle.inactiveForeground': theme.scheme.shade4,
      'panelTitle.activeForeground': theme.scheme.base.white,
      'panelTitle.activeBorder': theme.scheme.base.yellow,
      /**
      * Code Editor style
      */
      'editor.background': theme.scheme.background,
      'editor.foreground': theme.scheme.foreground,
      // 'editor.lineHighlightBackground': theme.scheme.shade1 + '50',
      // 'editor.lineHighlightBorder': theme.scheme.shade1 + '00',
      'editor.findMatchBackground': `${theme.scheme.background}00`,
      'editor.findMatchHighlightBackground': `${theme.scheme.background}00`,
      'editor.findMatchBorder': theme.scheme.base.pink,
      // 'editor.findMatchHighlightBorder': theme.scheme.shade6,
      // Editor Indent guides
      // 'editorIndentGuide.background': theme.scheme.shade1,
      // 'editorIndentGuide.activeBackground': theme.scheme.shade3,
      // Editor line number
      // 'editorLineNumber.foreground': theme.scheme.shade3,
      'editorLineNumber.activeForeground': theme.scheme.base.yellow,
      // Editor tab groups
      'editorGroupHeader.tabsBackground': theme.scheme.background,
      'editorGroup.border': theme.scheme.background,
      // Editor gutter
      'editorGutter.modifiedBackground': `${theme.scheme.base.blue}60`,
      'editorGutter.addedBackground': `${theme.scheme.base.green}60`,
      'editorGutter.deletedBackground': `${theme.scheme.base.red}60`,
      /**
      * Activity bar style
      */
      'activityBar.background': theme.scheme.background,
      'activityBar.border': theme.scheme.background,
      // 'activityBar.foreground': theme.scheme.shade5,
      'activityBar.activeBorder': theme.scheme.base.pink,
      /**
      * Activity bar badges style
      */
      'activityBarBadge.background': theme.scheme.base.cyan,
      'activityBarBadge.foreground': theme.scheme.background,
      /**
      * Global badges style
      */
      'badge.background': theme.scheme.base.cyan,
      'badge.foreground': theme.scheme.background,
      /**
      * Extensions badge style
      */
      // 'extensionBadge.remoteBackground': theme.scheme.shade3,
      'extensionBadge.remoteForeground': theme.scheme.foreground,
      /**
      * Scrollbar style
      */
      // 'scrollbarSlider.background': theme.scheme.shade4 + '50',
      // 'scrollbarSlider.hoverBackground': theme.scheme.shade2,
      // 'scrollbarSlider.activeBackground': theme.scheme.shade4,
      /**
      * Tabs style
      */
      'tab.activeBorder': theme.scheme.background,
      'tab.activeBorderTop': theme.scheme.base.cyan,
      // 'tab.inactiveModifiedBorder': theme.scheme.shade5,
      'tab.activeModifiedBorder': theme.scheme.base.pink,
      // 'tab.unfocusedActiveBorder': theme.scheme.shade4,
      'tab.activeForeground': theme.scheme.base.white,
      'tab.activeBackground': theme.scheme.background,
      // 'tab.inactiveForeground': theme.scheme.shade4,
      'tab.inactiveBackground': theme.scheme.background,
      'tab.unfocusedActiveForeground': theme.scheme.foreground,
      'tab.border': theme.scheme.background,
      /**
      * Editor overlay widgets style (find/replace..)
      */
      // 'editorWidget.background': theme.scheme.shade1,
      'editorWidget.resizeBorder': theme.scheme.base.yellow,
      'editorWidget.border': theme.scheme.base.yellow,
      /**
      * Statusbar style
      */
      'statusBar.noFolderBackground': theme.scheme.background,
      // 'statusBar.border': theme.scheme.borders,
      'statusBar.background': theme.scheme.background,
      // 'statusBar.foreground': theme.scheme.shade4,
      'statusBar.debuggingBackground': theme.scheme.base.purple,
      'statusBar.debuggingForeground': theme.scheme.base.white,
      /**
      * Statusbar items style
      */
      // 'statusBarItem.hoverBackground': theme.scheme.shade1 + '50',
      'statusBarItem.remoteForeground': theme.scheme.base.black,
      'statusBarItem.remoteBackground': theme.scheme.base.yellow,
      /**
      * Matching brackets style
      */
      'editorBracketMatch.border': `${theme.scheme.base.cyan}70`,
      'editorBracketMatch.background': theme.scheme.background,
      /**
      * Editor Overview Ruler style
      */
      'editorOverviewRuler.findMatchForeground': theme.scheme.base.pink,
      // 'editorOverviewRuler.border': theme.scheme.borders,
      'editorOverviewRuler.errorForeground': theme.scheme.base.red,
      'editorOverviewRuler.infoForeground': theme.scheme.base.blue,
      'editorOverviewRuler.warningForeground': theme.scheme.base.yellow,
      /**
      * Squigglies style
      */
      'editorInfo.foreground': theme.scheme.base.blue,
      'editorWarning.foreground': theme.scheme.base.yellow,
      'editorError.foreground': theme.scheme.base.red,
      /**
      * Popop dialogs style
      */
      // 'editorHoverWidget.background': theme.scheme.shade1,
      // 'editorHoverWidget.border': theme.scheme.shade1,
      /**
      * Title bar style
      */
      'titleBar.activeBackground': theme.scheme.background,
      'titleBar.activeForeground': theme.scheme.foreground,
      'titleBar.inactiveBackground': theme.scheme.background,
      // 'titleBar.inactiveForeground': theme.scheme.shade4,
      // 'titleBar.border': theme.scheme.borders,
      /**
      * Textfield and inputs style
      */
      'input.background': theme.scheme.background,
      'input.foreground': theme.scheme.base.pink,
      // 'input.placeholderForeground': theme.scheme.shade3,
      // 'input.border': theme.scheme.shade1,
      /**
      * Inputs validation style
      */
      'inputValidation.errorBorder': `${theme.scheme.base.red}50`,
      'inputValidation.infoBorder': `${theme.scheme.base.blue}50`,
      'inputValidation.warningBorder': `${theme.scheme.base.yellow}50`,
      /**
      * Dropdown menu style
      */
      // 'dropdown.background': theme.scheme.shade1,
      // 'dropdown.border': theme.scheme.shade1,
      /**
      * Lists style
      */
      'list.hoverForeground': theme.scheme.foreground,
      'list.hoverBackground': `${theme.scheme.background}00`,
      'list.activeSelectionBackground': `${theme.scheme.background}00`,
      'list.activeSelectionForeground': theme.scheme.base.cyan,
      'list.inactiveSelectionForeground': theme.scheme.base.cyan,
      // 'list.inactiveSelectionBackground': theme.scheme.shade1 + '50',
      // 'list.focusBackground': theme.scheme.shade1,
      'list.focusForeground': theme.scheme.base.white,
      'list.highlightForeground': theme.scheme.base.cyan,
      // 'list.dropBackground': theme.scheme.shade2,
      /**
      * Editor suggest widget style
      */
      // 'editorSuggestWidget.background': theme.scheme.shade1,
      'editorSuggestWidget.foreground': theme.scheme.foreground,
      'editorSuggestWidget.highlightForeground': theme.scheme.base.cyan,
      // 'editorSuggestWidget.selectedBackground': theme.scheme.shade2,
      // 'editorSuggestWidget.border': theme.scheme.shade1,
      /**
      * Editor diff editor style
      */
      'diffEditor.insertedTextBackground': `${theme.scheme.base.cyan}20`,
      'diffEditor.removedTextBackground': `${theme.scheme.base.pink}20`,
      /**
      * Extensions button style
      */
      'extensionButton.prominentBackground': theme.scheme.base.yellow,
      'extensionButton.prominentHoverBackground': theme.scheme.base.yellow,
      'extensionButton.prominentForeground': theme.scheme.background,
      /**
      * Peekview window style
      */
      'peekViewEditor.background': theme.scheme.background,
      'peekViewResult.background': theme.scheme.background,
      // 'peekView.border': theme.scheme.shade1,
      // 'peekViewTitle.background': theme.scheme.shade1,
      'peekViewEditorGutter.background': theme.scheme.background,
      'peekViewTitleDescription.foreground': theme.scheme.foreground,
      'peekViewResult.matchHighlightBackground': `${theme.scheme.base.pink}50`,
      'peekViewEditor.matchHighlightBackground': `${theme.scheme.base.pink}50`,
      // 'peekViewResult.selectionBackground': theme.scheme.shade1,
      /**
      * GIT decorations style
      */
      'gitDecoration.deletedResourceForeground': theme.scheme.base.red,
      'gitDecoration.conflictingResourceForeground': theme.scheme.base.yellow,
      'gitDecoration.modifiedResourceForeground': theme.scheme.base.blue,
      'gitDecoration.untrackedResourceForeground': theme.scheme.base.green,
      // 'gitDecoration.ignoredResourceForeground': theme.scheme.shade1,
      /**
      * Breadcrumb style
      */
      'breadcrumb.background': theme.scheme.background,
      // 'breadcrumb.foreground': theme.scheme.shade4,
      'breadcrumb.focusForeground': theme.scheme.foreground,
      'breadcrumb.activeSelectionForeground': theme.scheme.base.pink,
      'breadcrumbPicker.background': theme.scheme.background,
      /**
      * Custom menus style
      */
      // 'menu.background': theme.scheme.shade1,
      // 'menu.foreground': theme.scheme.shade3,
      // 'menu.selectionBackground': theme.scheme.shade1,
      'menu.selectionForeground': theme.scheme.foreground,
      // 'menu.selectionBorder': theme.scheme.shade1,
      // 'menu.separatorBackground': theme.scheme.shade3,
      /**
      * Menu Bar style
      */
      // 'menubar.selectionBackground': theme.scheme.shade1,
      'menubar.selectionForeground': theme.scheme.foreground,
      // 'menubar.selectionBorder': theme.scheme.shade1,
      /**
      * Settings elements style
      */
      'settings.dropdownForeground': theme.scheme.foreground,
      'settings.dropdownBackground': theme.scheme.background,
      'settings.numberInputForeground': theme.scheme.foreground,
      'settings.numberInputBackground': theme.scheme.background,
      'settings.textInputForeground': theme.scheme.foreground,
      'settings.textInputBackground': theme.scheme.background,
      'settings.headerForeground': theme.scheme.base.cyan,
      'settings.modifiedItemIndicator': theme.scheme.base.pink,
      'settings.checkboxBackground': theme.scheme.background,
      'settings.checkboxForeground': theme.scheme.foreground,
      /**
      * List Filter Widget style
      */
      'listFilterWidget.background': theme.scheme.base.violet,
      'listFilterWidget.outline': theme.scheme.base.violet,
      'listFilterWidget.noMatchesOutline': theme.scheme.base.violet
    },
    /**
    * Overrides specific syntax scopes provided
    * by the theme generator
    */
    syntax: {
      boolean: theme.scheme.base.pink,
      class: theme.scheme.base.violet,
      classMember: theme.scheme.base.red,
      // Comment: theme.scheme.shade4,
      cssClass: theme.scheme.base.yellow,
      cssId: theme.scheme.base.orange,
      cssTag: theme.scheme.base.yellow,
      function: theme.scheme.base.yellow,
      functionCall: theme.scheme.base.violet,
      identifier: theme.scheme.base.cyan,
      keyword: theme.scheme.base.red,
      storage: theme.scheme.foreground,
      string: theme.scheme.base.green,
      stringEscape: theme.scheme.foreground,
      type: theme.scheme.base.pink
    },
    /**
    * Define the integrated shell
    * color palette
    */
    terminal: {
      // Black: theme.scheme.shade3,
      blue: theme.scheme.base.blue,
      // BrightBlack: theme.scheme.shade3,
      brightBlue: theme.scheme.base.blue,
      brightCyan: theme.scheme.base.cyan,
      brightGreen: theme.scheme.base.green,
      brightMagenta: theme.scheme.base.purple,
      brightRed: theme.scheme.base.red,
      brightWhite: theme.scheme.base.white,
      brightYellow: theme.scheme.base.yellow,
      cyan: theme.scheme.base.cyan,
      green: theme.scheme.base.green,
      magenta: theme.scheme.base.purple,
      red: theme.scheme.base.red,
      white: theme.scheme.base.white,
      yellow: theme.scheme.base.yellow
    },
    /**
    * Define workbench colors
    */
    ui: {
      // Highlights matches from the find widget
      // currentFindMatchHighlight: theme.scheme.shade5,
      // Set the editor cursor color
      cursor: theme.scheme.base.yellow,
      // Ighlights matches from the find widge
      findMatchHighlight: theme.scheme.base.pink,
      // Highlights the selected area for "find in selection"
      findRangeHighlight: `${theme.scheme.base.yellow}30`,
      // Set color for invisible characters/whitespaces
      // invisibles: theme.scheme.shade1,
      // Highlights text which matches the selected text
      // selection: theme.scheme.shade1,
      // Highlights text inside selected area
      selectionHighlight: `${theme.scheme.base.yellow}50`,
      // When the cursor is on a symbol, highlights places that symbol is read
      wordHighlight: `${theme.scheme.base.pink}30`,
      // When the cursor is on a symbol, highlights places that symbol is written
      wordHighlightStrong: `${theme.scheme.base.green}30`
    }
    /**
    * Override all syntax tokens
    */
    // customTokens: [
    // 	{
    // 		name: 'String',
    // 		scope: [ 'string' ],
    // 		settings: {
    // 			fontStyle: 'normal',
    // 			foreground: '#',
    // 			background: '#'
    // 		}
    // 	}
    // ]
  };
};
