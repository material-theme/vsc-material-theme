import {IColorSet} from '@moxer/vscode-theme-generator';
import {ThemeSetting} from './types';

export const getColorSet = (theme: ThemeSetting): IColorSet => {
  return {
    semanticHighlighting: true,
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
      color4: theme.scheme.base.blue,
      // Determines the overall text foreground color
      foreground: theme.scheme.foreground
    },
    /**
    * Overrides specific syntax scopes provided
    * by the theme generator
    */
    syntax: {
      boolean: theme.scheme.base.pink,
      class: theme.scheme.base.yellow,
      classMember: theme.scheme.base.red,
      comment: theme.scheme.comments,
      cssClass: theme.scheme.base.yellow,
      cssId: theme.scheme.base.orange,
      cssProperties: theme.scheme.base.paleblue,
      cssTag: theme.scheme.base.yellow,
      function: theme.scheme.base.blue,
      functionCall: theme.scheme.base.blue,
      identifier: theme.scheme.base.red,
      keyword: theme.scheme.base.cyan,
      storage: theme.scheme.base.purple,
      string: theme.scheme.base.green,
      stringEscape: theme.scheme.foreground,
      type: theme.scheme.base.yellow,
      punctuation: theme.scheme.base.cyan,
      otherKeyword: theme.scheme.base.orange,
      variable: theme.scheme.foreground,
      number: theme.scheme.base.orange
    },
    /**
    * Override all syntax tokens
    */
    customTokens: [
      {
        name: 'Markup Deleted',
        scope: [
          'markup.deleted'
        ],
        settings: {
          foreground: theme.scheme.base.red
        }
      },
      {
        name: 'Markup Inserted',
        scope: [
          'markup.inserted'
        ],
        settings: {
          foreground: theme.scheme.base.green
        }
      },
      {
        name: 'Markup Underline',
        scope: [
          'markup.underline'
        ],
        settings: {
          fontStyle: 'underline'
        }
      },
      {
        name: 'Keyword Control',
        scope: [
          'keyword.control'
        ],
        settings: {
          foreground: theme.scheme.base.cyan,
          fontStyle: 'italic'
        }
      },
      {
        name: 'Parameter',
        scope: [
          'variable.parameter'
        ],
        settings: {
          fontStyle: 'italic'
        }
      },
      {
        name: 'Python - Self Parameter',
        scope: [
          'variable.parameter.function.language.special.self.python'
        ],
        settings: {
          foreground: theme.scheme.base.red,
          fontStyle: 'italic'
        }
      },
      {
        name: 'Python - Format Placeholder',
        scope: [
          'constant.character.format.placeholder.other.python'
        ],
        settings: {
          foreground: theme.scheme.base.orange
        }
      },
      {
        name: 'Markdown - Blockquote',
        scope: [
          'markup.quote'
        ],
        settings: {
          fontStyle: 'italic',
          foreground: theme.scheme.base.cyan
        }
      },
      {
        name: 'Markdown - Fenced Language',
        scope: [
          'markup.fenced_code.block'
        ],
        settings: {
          foreground: `${theme.scheme.foreground}90`
        }
      },
      {
        name: 'Markdown - Blockquote Punctuation',
        scope: [
          'punctuation.definition.quote'
        ],
        settings: {
          foreground: theme.scheme.base.pink
        }
      },
      {
        name: 'JSON Key - Level 0',
        scope: [
          'meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.purple
        }
      },
      {
        name: 'JSON Key - Level 1',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.yellow
        }
      },
      {
        name: 'JSON Key - Level 2',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.orange
        }
      },
      {
        name: 'JSON Key - Level 3',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.red
        }
      },
      {
        name: 'JSON Key - Level 4',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.brown
        }
      },
      {
        name: 'JSON Key - Level 5',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.blue
        }
      },
      {
        name: 'JSON Key - Level 6',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.pink
        }
      },
      {
        name: 'JSON Key - Level 7',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.purple
        }
      },
      {
        name: 'JSON Key - Level 8',
        scope: [
          'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
        ],
        settings: {
          foreground: theme.scheme.base.green
        }
      }
    ],
    /**
    * Overrides workbench UI Elements
    */
    workbench: {
      /**
      * General elements style
      */
      focusBorder: `${theme.scheme.focusBorder}00`,
      'editorRuler.foreground': theme.scheme.guides,
      'widget.shadow': theme.scheme.shadow,
      'scrollbar.shadow': theme.scheme.shadow,
      'editorLink.activeForeground': theme.scheme.foreground,
      'selection.background': `${theme.scheme.lineHighlight}80`,
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
      'editor.selectionHighlightBackground': `${theme.scheme.caret}20`,
      'editor.lineHighlightBorder': `${theme.scheme.lineHighlight}00`,
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
      'badge.background': `${theme.scheme.lineHighlight}30`,
      'badge.foreground': theme.scheme.comments,
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
      * Notebook style
      */
      'notebook.focusedCellBorder': theme.scheme.defaultAccent,
      'notebook.inactiveFocusedCellBorder': `${theme.scheme.defaultAccent}50`,
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
      'input.foreground': theme.scheme.foreground,
      'input.placeholderForeground': `${theme.scheme.foreground}60`,
      'input.border': theme.scheme.inputBorder,

      /**
      * Inputs validation style
      */
      'inputValidation.errorBorder': `${theme.scheme.base.red}`,
      'inputValidation.infoBorder': `${theme.scheme.base.blue}`,
      'inputValidation.warningBorder': `${theme.scheme.base.yellow}`,
      /**
      * Dropdown menu style
      */
      'dropdown.background': theme.scheme.background,
      'dropdown.border': theme.scheme.inputBorder,
      /**
       * Quick Panel
       */
      'quickInput.background': theme.scheme.background,
      'quickInput.foreground': theme.scheme.sidebarForeground,
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
      'quickInput.list.focusBackground': `${theme.scheme.foreground}20`,
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
      * Notifications
      */
      'notifications.background': theme.scheme.background,
      'notifications.foreground': theme.scheme.foreground,
      'notificationLink.foreground': theme.scheme.defaultAccent,
      /**
      * Extensions button style
      */
      'extensionButton.prominentBackground': `${theme.scheme.base.green}90`,
      'extensionButton.prominentHoverBackground': theme.scheme.base.green,
      'extensionButton.prominentForeground': theme.scheme.base.black,
      /**
      * Peekview window style
      */
      'peekView.border': theme.scheme.shadow,
      'peekViewEditor.background': `${theme.scheme.foreground}05`,
      'peekViewTitle.background': `${theme.scheme.foreground}05`,
      'peekViewResult.background': `${theme.scheme.foreground}05`,
      'peekViewEditorGutter.background': `${theme.scheme.foreground}05`,
      'peekViewTitleDescription.foreground': `${theme.scheme.foreground}60`,
      'peekViewResult.matchHighlightBackground': theme.scheme.selection,
      'peekViewEditor.matchHighlightBackground': theme.scheme.selection,
      'peekViewResult.selectionBackground': `${theme.scheme.sidebarForeground}70`,
      /**
      * GIT decorations style
      */
      'gitDecoration.deletedResourceForeground': `${theme.scheme.base.red}90`,
      'gitDecoration.conflictingResourceForeground': `${theme.scheme.base.yellow}90`,
      'gitDecoration.modifiedResourceForeground': `${theme.scheme.base.blue}90`,
      'gitDecoration.untrackedResourceForeground': `${theme.scheme.base.green}90`,
      'gitDecoration.ignoredResourceForeground': `${theme.scheme.sidebarForeground}90`,
      /**
      * Breadcrumb style
      */
      'breadcrumb.background': theme.scheme.background,
      'breadcrumb.foreground': theme.scheme.sidebarForeground,
      'breadcrumb.focusForeground': theme.scheme.foreground,
      'breadcrumb.activeSelectionForeground': theme.scheme.defaultAccent,
      'breadcrumbPicker.background': theme.scheme.backgroundAlt,
      /**
      * Custom menus style
      */
      'menu.background': theme.scheme.background,
      'menu.foreground': theme.scheme.foreground,
      'menu.selectionBackground': `${theme.scheme.lineHighlight}50`,
      'menu.selectionForeground': theme.scheme.defaultAccent,
      'menu.selectionBorder': theme.scheme.inactiveSelectionBackground,
      'menu.separatorBackground': theme.scheme.foreground,
      /**
      * Menu Bar style
      */
      'menubar.selectionBackground': theme.scheme.inactiveSelectionBackground,
      'menubar.selectionForeground': theme.scheme.defaultAccent,
      'menubar.selectionBorder': theme.scheme.inactiveSelectionBackground,
      /**
      * Settings elements style
      */
      'settings.dropdownForeground': theme.scheme.foreground,
      'settings.dropdownBackground': theme.scheme.backgroundAlt,
      'settings.numberInputForeground': theme.scheme.foreground,
      'settings.numberInputBackground': theme.scheme.backgroundAlt,
      'settings.textInputForeground': theme.scheme.foreground,
      'settings.textInputBackground': theme.scheme.backgroundAlt,
      'settings.headerForeground': theme.scheme.defaultAccent,
      'settings.modifiedItemIndicator': theme.scheme.defaultAccent,
      'settings.checkboxBackground': theme.scheme.backgroundAlt,
      'settings.checkboxForeground': theme.scheme.foreground,
      /**
      * List Filter Widget style
      */
      'listFilterWidget.background': theme.scheme.inactiveSelectionBackground,
      'listFilterWidget.outline': theme.scheme.inactiveSelectionBackground,
      'listFilterWidget.noMatchesOutline': theme.scheme.inactiveSelectionBackground,
      /**
      * Debug Console
      */
      'debugConsole.errorForeground': theme.scheme.base.red,
      'debugConsole.infoForeground': theme.scheme.base.cyan,
      'debugConsole.warningForeground': theme.scheme.base.yellow
    },
    /**
    * Define the integrated shell
    * color palette
    */
    terminal: {
      black: theme.scheme.base.black,
      blue: theme.scheme.base.blue,
      brightBlack: theme.scheme.comments,
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
      cursor: theme.scheme.caret,
      // Ighlights matches from the find widget
      findMatchHighlight: theme.scheme.foreground,
      // Highlights the selected area for "find in selection"
      findRangeHighlight: `${theme.scheme.base.yellow}30`,
      // Set color for invisible characters/whitespaces
      invisibles: theme.scheme.guides,
      // Highlights text which matches the selected text
      selection: theme.scheme.selection,
      // Highlights text inside selected area
      selectionHighlight: `${theme.scheme.base.yellow}50`,
      // When the cursor is on a symbol, highlights places that symbol is read
      wordHighlight: `${theme.scheme.base.pink}30`,
      // When the cursor is on a symbol, highlights places that symbol is written
      wordHighlightStrong: `${theme.scheme.base.green}30`
    }
  };
};
