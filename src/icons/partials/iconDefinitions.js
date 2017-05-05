"iconDefinitions": {
    "_folder_dark": {
      "iconPath": "../icons/folder.svg"
    },
    "_folder_dark_build": {
      "iconPath": "../icons/folder-build.svg"
    },
    "_folder_light": {
      "iconPath": "../icons/folder-light.svg"
    },
    "_folder_light_build": {
      "iconPath": "../icons/folder-light-build.svg"
    },
    "_folder_open": {
      "iconPath": "../icons/folder-outline.svg"
    },
    "_folder_open_build": {
      "iconPath": "../icons/folder-outline-build.svg"
    },
    "_file_dark": {
      "iconPath": "../icons/file.svg"
    },
    {{#icons}}
    "_file_{{name}}": {
      "iconPath": "../icons/{{name}}.svg"
    }{{^last}},{{/last}}
    {{/icons}}
},
