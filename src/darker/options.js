
/* @ THEME OPTIONS
 * Options override
========================================================================= */

    // Tabs size ()

  {
    "class": "tabset_control",
    "settings": ["material_theme_small_tab"],
    "tab_height": 36,
    "content_margin": [12, 0, 8, 0]
  },

  {
    "class": "tabset_control",
    "settings": ["material_theme_tabs_autowidth"],
    "tab_width": 0
  },

  {
    "class": "tab_control",
    "settings": ["material_theme_small_tab"],
    "content_margin": [12, 8, 6, 4],
  },

  // Tabs separator
  {
    "class": "tab_control",
    "settings": ["material_theme_tabs_separator"],
    "layer3.texture": "Material Theme/assets/darker/tab_separator.png",
    "layer3.inner_margin": [1, 1],
    "layer3.opacity": 1.0,
  },

    // Tab Labels

  {
    "class": "tab_label",
    "settings": ["material_theme_bold_tab"],
    "font.bold": true
  },

    // Filetype icons in sidebar

  {
    "class": "icon_file_type",
    "settings": ["material_theme_disable_fileicons"],
    "layer0.opacity": 0,
    "content_margin": [0, 0]
  },

    // Folder animation

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/commons/folder--hover.png",
  },

    // Folder animation Lime

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_lime"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-lime/folder--hover.png",
  },

    // Folder animation Purple

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_purple"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-purple/folder--hover.png",
  },

    // Folder animation Red

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_red"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-red/folder--hover.png",
  },

    // Folder animation Orange

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_orange"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-orange/folder--hover.png",
  },

    // Folder animation Yellow

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_yellow"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-yellow/folder--hover.png",
  },


    // Folder animation Indigo

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_indigo"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-indigo/folder--hover.png",
  },

    // Folder animation Pink

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_pink"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-pink/folder--hover.png",
  },

    // Folder animation Blue

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_blue"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-blue/folder--hover.png",
  },

    // Folder animation Cyan

  {
    "class": "icon_folder",
    "settings": ["material_theme_disable_folder_animation", "material_theme_accent_cyan"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer1.opacity": 0.0,
    "layer2.opacity": 0.0,
    "layer3.texture": "Material Theme/assets/accent-cyan/folder--hover.png",
  },

    // Small status bar

  {
    "class": "status_container",
    "settings": ["material_theme_small_statusbar"],
    "content_margin": [12, 6, 12, 6],
  },

    // Tree Indicator

  {
    "class": "tree_row",
    "settings": ["material_theme_disable_tree_indicator"],
    "attributes": ["selected"],
    "layer1.opacity": 0.0
  },

    // Status bar panel

  {
    "class": "panel_control",
    "settings": ["material_theme_panel_separator"],
    "layer1.texture": "Material Theme/assets/commons/panel_separator.png",
    "layer1.opacity": 0.2,
    "layer1.inner_margin": [2, 2, 2, 2],
  },

    // Contrast mode

  {
    "class": "sidebar_container",
    "settings": ["material_theme_contrast_mode"],
    "layer0.tint": [30, 30, 30]
  },
  {
    "class": "sidebar_tree",
    "settings": ["material_theme_contrast_mode"],
    "layer0.tint": [30 ,30, 30]
  },
  {
    "class": "status_bar",
    "settings": ["material_theme_contrast_mode"],
    "layer1.tint": [30, 30, 30]
  },

    // Compact mode

  {
    "class": "sidebar_tree",
    "settings": ["material_theme_compact_sidebar"],
    "row_padding": [24, 5]
  },

  {
    "class": "panel_control",
    "settings": ["material_theme_compact_panel"],
    "content_margin": [0, 0, 0, 0],
  }

