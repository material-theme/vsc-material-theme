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
      focusBorder: `${theme.scheme.focusBorder}00`,
      'editorCursor.foreground': theme.scheme.caret,
      'editorRuler.foreground': theme.scheme.guides,
      'widget.shadow': `${theme.scheme.background}00`,
      'scrollbar.shadow': theme.scheme.shadow,
      'editorLink.activeForeground': theme.scheme.foreground,
      'selection.background': theme.scheme.defaultAccent,
      'progressBar.background': theme.scheme.defaultAccent,
      'debugToolBar.background': theme.scheme.background,
      'pickerGroup.foreground': theme.scheme.defaultAccent,
      'editorMarkerNavigation.background': `${theme.scheme.foreground}05`,
      'tree.indentGuidesStroke': theme.scheme.guides,
      'terminalCursor.foreground': theme.scheme.base.yellow,
      'terminalCursor.background': theme.scheme.base.black,
      'editorWhitespace.foreground': `${theme.scheme.foreground}40`,
      /**
      * InputOption
      */
      'inputOption.activeBackground': `${theme.scheme.foreground}30`,
      'inputOption.activeBorder': `${theme.scheme.foreground}30`,
      /**
      * Buttons style
      */
      'button.background': theme.scheme.selection,
      // 'button.hoverBackground': theme.scheme.shade2,
      /**
      * Links style
      */
      'textLink.foreground': theme.scheme.defaultAccent,
      'textLink.activeForeground': theme.scheme.foreground,
      /**
      * Sidebar style
      */
      'sideBar.background': theme.scheme.backgroundAlt,
      'sideBar.foreground': theme.scheme.sidebarForeground,
      'sideBar.border': `${theme.scheme.contrastBorder}60`,
      /**
      * Sidebar elements style
      */
      'sideBarTitle.foreground': theme.scheme.foreground,
      'sideBarSectionHeader.background': theme.scheme.backgroundAlt,
      'sideBarSectionHeader.border': `${theme.scheme.contrastBorder}60`,
      // "sideBarSectionHeader.foreground": theme.scheme.foreground,
      /**
      * Window panels style (terminal, global search)
      */
      'panel.border': `${theme.scheme.contrastBorder}60`,
      'panel.background': theme.scheme.backgroundAlt,
      'panel.dropBackground': theme.scheme.foreground,
      /**
      * Window panels elements style
      */
      'panelTitle.inactiveForeground': theme.scheme.foreground,
      'panelTitle.activeForeground': theme.scheme.tabActiveForeground,
      'panelTitle.activeBorder': theme.scheme.defaultAccent,
      /**
      * Code Editor style
      */
      'editor.background': theme.scheme.background,
      'editor.foreground': theme.scheme.foreground,
      'editor.lineHighlightBackground': `${theme.scheme.lineHighlight}50`,
      'editor.selectionBackground': theme.scheme.selection,
      'editor.selectionHighlightBackground': `${theme.scheme.caret}20`,
      // 'editor.lineHighlightBorder': theme.scheme.shade1 + '00',
      'editor.findMatchBackground': theme.scheme.findMatchBackground,
      'editor.findMatchHighlightBackground': theme.scheme.findMatchHighlightBackground,
      'editor.findMatchBorder': theme.scheme.defaultAccent,
      'editor.findMatchHighlightBorder': theme.scheme.findMatchHighlightBorder,
      // Editor Indent guides
      'editorIndentGuide.background': `${theme.scheme.guides}70`,
      'editorIndentGuide.activeBackground': theme.scheme.guides,
      // Editor line number
      'editorLineNumber.foreground': theme.scheme.lineNumbers,
      'editorLineNumber.activeForeground': theme.scheme.sidebarForeground,
      // Editor tab groups
      'editorGroupHeader.tabsBackground': theme.scheme.background,
      'editorGroup.border': theme.scheme.shadow,
      // Editor gutter
      'editorGutter.modifiedBackground': `${theme.scheme.base.blue}60`,
      'editorGutter.addedBackground': `${theme.scheme.base.green}60`,
      'editorGutter.deletedBackground': `${theme.scheme.base.red}60`,
      /**
      * Activity bar style
      */
      'activityBar.background': theme.scheme.backgroundAlt,
      'activityBar.border': `${theme.scheme.contrastBorder}60`,
      'activityBar.foreground': theme.scheme.foreground,
      'activityBar.activeBorder': theme.scheme.defaultAccent,
      /**
      * Activity bar badges style
      */
      'activityBarBadge.background': theme.scheme.defaultAccent,
      'activityBarBadge.foreground': theme.scheme.base.black,
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
      'scrollbarSlider.background': theme.scheme.scrollbars,
      'scrollbarSlider.hoverBackground': theme.scheme.scrollbarsHover,
      'scrollbarSlider.activeBackground': theme.scheme.defaultAccent,
      /**
      * Tabs style
      */
      'tab.activeBorder': theme.scheme.defaultAccent,
      'tab.activeModifiedBorder': theme.scheme.sidebarForeground,
      'tab.unfocusedActiveBorder': theme.scheme.comments,
      'tab.activeForeground': theme.scheme.tabActiveForeground,
      'tab.inactiveForeground': theme.scheme.sidebarForeground,
      'tab.inactiveBackground': theme.scheme.background,
      'tab.activeBackground': theme.scheme.background,
      'tab.unfocusedActiveForeground': theme.scheme.foreground,
      'tab.border': theme.scheme.background,
      // 'tab.inactiveModifiedBorder': theme.scheme.shade5,
      /**
      * Editor overlay widgets style (find/replace..)
      */
      'editorWidget.background': theme.scheme.backgroundAlt,
      'editorWidget.resizeBorder': theme.scheme.defaultAccent,
      'editorWidget.border': theme.scheme.defaultAccent,
      /**
      * Statusbar style
      */
      'statusBar.noFolderBackground': theme.scheme.background,
      'statusBar.border': `${theme.scheme.contrastBorder}60`,
      'statusBar.background': theme.scheme.backgroundAlt,
      'statusBar.foreground': theme.scheme.statusbarForeground,
      'statusBar.debuggingBackground': theme.scheme.base.purple,
      'statusBar.debuggingForeground': theme.scheme.base.white,
      /**
      * Statusbar items style
      */
      'statusBarItem.hoverBackground': `${theme.scheme.comments}20`,
      'statusBarItem.remoteForeground': theme.scheme.base.black,
      'statusBarItem.remoteBackground': theme.scheme.defaultAccent,
      /**
      * Matching brackets style
      */
      'editorBracketMatch.border': `${theme.scheme.caret}50`,
      'editorBracketMatch.background': theme.scheme.background,
      /**
      * Editor Overview Ruler style
      */
      'editorOverviewRuler.findMatchForeground': theme.scheme.defaultAccent,
      'editorOverviewRuler.border': theme.scheme.background,
      'editorOverviewRuler.errorForeground': `${theme.scheme.base.red}40`,
      'editorOverviewRuler.infoForeground': `${theme.scheme.base.blue}40`,
      'editorOverviewRuler.warningForeground': `${theme.scheme.base.yellow}40`,
      /**
      * Squigglies style
      */
      'editorInfo.foreground': `${theme.scheme.base.blue}70`,
      'editorWarning.foreground': `${theme.scheme.base.yellow}70`,
      'editorError.foreground': `${theme.scheme.base.red}70`,
      /**
      * Popop dialogs style
      */
      'editorHoverWidget.background': theme.scheme.background,
      'editorHoverWidget.border': theme.scheme.inputBorder,
      /**
      * Title bar style
      */
      'titleBar.activeBackground': theme.scheme.backgroundAlt,
      'titleBar.activeForeground': theme.scheme.foreground,
      'titleBar.inactiveBackground': theme.scheme.backgroundAlt,
      'titleBar.inactiveForeground': theme.scheme.sidebarForeground,
      'titleBar.border': `${theme.scheme.contrastBorder}60`,
      /**
      * Textfield and inputs style
      */
      'input.background': theme.scheme.inputBackground,
      'input.foreground': theme.scheme.inputForeground,
      'input.placeholderForeground': `${theme.scheme.foreground}60`,
      'input.border': theme.scheme.inputBorder,
      /**
      * Inputs validation style
      */
      'inputValidation.errorBorder': `${theme.scheme.base.red}50`,
      'inputValidation.infoBorder': `${theme.scheme.base.blue}50`,
      'inputValidation.warningBorder': `${theme.scheme.base.yellow}50`,
      /**
      * Dropdown menu style
      */
      'dropdown.background': theme.scheme.background,
      'dropdown.border': theme.scheme.inputBorder,
      /**
      * Lists style
      */
      'list.hoverForeground': theme.scheme.listHoverForeground,
      'list.hoverBackground': theme.scheme.backgroundAlt,
      'list.activeSelectionBackground': theme.scheme.backgroundAlt,
      'list.activeSelectionForeground': theme.scheme.defaultAccent,
      'list.inactiveSelectionForeground': theme.scheme.defaultAccent,
      'list.inactiveSelectionBackground': theme.scheme.inactiveSelectionBackground,
      'list.focusBackground': `${theme.scheme.foreground}20`,
      'list.focusForeground': theme.scheme.foreground,
      'list.highlightForeground': theme.scheme.defaultAccent,
      // 'list.dropBackground': theme.scheme.shade2,
      /**
      * Editor suggest widget style
      */
      'editorSuggestWidget.background': theme.scheme.background,
      'editorSuggestWidget.foreground': theme.scheme.foreground,
      'editorSuggestWidget.highlightForeground': theme.scheme.defaultAccent,
      'editorSuggestWidget.selectedBackground': `${theme.scheme.lineHighlight}50`,
      'editorSuggestWidget.border': theme.scheme.inputBorder,
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
