export interface IThemeVariant {
  id: string;
  name: string;
  scheme: {
    background: string;
    base: {
      black: string;
      blue: string;
      brown: string;
      cyan: string;
      green: string;
      orange: string;
      paleblue: string;
      pink: string;
      purple: string;
      red: string;
      violet: string;
      white: string;
      yellow: string;
    }
    caret: string;
    comments: string;
    findHighlight: string;
    focusBorder: string;
    foreground: string;
    guides: string;
    inputBackground: string;
    inputBorder: string;
    inputForeground: string;
    invisibles: string;
    lineHighlight: string;
    lineNumbers: string;
    listHoverForeground: string;
    scrollbars: string;
    scrollbarsHover: string;
    selection: string;
    shadow: string;
    sidebarForeground: string;
    statusbarForeground: string;
  }
  type: string;
}