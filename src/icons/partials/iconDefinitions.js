"iconDefinitions": {<% for( var i = 0; i < icons.length; i++ ){  %>
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
  "_file_<%= icons[i] %>": {
    "iconPath": "./icons/<%= icons[i] %>.svg"
  }<% if( i !== (icons.length - 1)){ %>,<%} %><% } %>
},