"iconDefinitions": {
    "_folder_dark": {
      "iconPath": "./icons/folder.svg"
    },
    "_folder_light": {
      "iconPath": "./icons/folder-light.svg"
    },
    "_folder_open": {
      "iconPath": "./icons/folder-outline.svg"
    },
    "_file_dark": {
      "iconPath": "./icons/file.svg"
    },
    {{#icons}}
    "_file_{{name}}": {
      "iconPath": "./icons/{{name}}.svg"
    }{{^last}},{{/last}}
    {{/icons}}
},
