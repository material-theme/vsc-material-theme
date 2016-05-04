/* @ THEME ACCENTS

 * Accents color settings
=========================================================================
This specific options define the accents color to be used in the general UI.
NOTE: This rulers must only override the original definitions */


/* LIME ACCENT
 * =================================================================== */


  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_lime"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-lime/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_lime"],
    "layer0.tint": [139, 195, 74],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_lime"],
    "layer0.tint": [139, 195, 74],
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_lime"],
    "match_fg": [139, 195, 74],
    "selected_match_fg": [139, 195, 74]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_lime"],
    "color": [255, 255, 255, 255]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-lime/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_lime"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [139, 195, 74]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_lime"],
    "layer2.texture": "Material Theme/assets/accent-lime/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-lime/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_lime"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-lime/folder_opened--hover-0.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-1.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-2.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-3.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-4.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-5.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-5.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-5.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-6.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-6.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-6.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-6.png",
        "Material Theme/assets/accent-lime/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-lime/spinner7.png",
        "Material Theme/assets/accent-lime/spinner6.png",
        "Material Theme/assets/accent-lime/spinner5.png",
        "Material Theme/assets/accent-lime/spinner4.png",
        "Material Theme/assets/accent-lime/spinner3.png",
        "Material Theme/assets/accent-lime/spinner2.png",
        "Material Theme/assets/accent-lime/spinner1.png",
        "Material Theme/assets/accent-lime/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-lime/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-lime/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_lime"],
    "match_fg": [139, 195, 74],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [139, 195, 74]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_lime"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [139, 195, 74],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [139, 195, 74]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_lime"],
    "match_fg": [139, 195, 74],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [139, 195, 74]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_lime"],
    "fg": [139, 195, 74],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_lime"],
    "layer1.texture": "Material Theme/assets/accent-lime/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_lime"],
    "layer0.texture": "Material Theme/assets/accent-lime/find_reverse--hover.png",
  },

/* PURPLE ACCENT
 * =================================================================== */


  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_purple"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-purple/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_purple"],
    "layer0.tint": [156, 39, 176],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_purple"],
    "layer0.tint": [156, 39, 176]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_purple"],
    "match_fg": [156, 39, 176],
    "selected_match_fg": [156, 39, 176]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_purple"],
    "color": [255, 255, 255, 255]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-purple/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_purple"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [171, 71, 188]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_purple"],
    "layer2.texture": "Material Theme/assets/accent-purple/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-purple/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_purple"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-purple/folder_opened--hover-0.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-1.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-2.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-3.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-4.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-5.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-5.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-5.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-6.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-6.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-6.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-6.png",
        "Material Theme/assets/accent-purple/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-purple/spinner7.png",
        "Material Theme/assets/accent-purple/spinner6.png",
        "Material Theme/assets/accent-purple/spinner5.png",
        "Material Theme/assets/accent-purple/spinner4.png",
        "Material Theme/assets/accent-purple/spinner3.png",
        "Material Theme/assets/accent-purple/spinner2.png",
        "Material Theme/assets/accent-purple/spinner1.png",
        "Material Theme/assets/accent-purple/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-purple/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-purple/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_purple"],
    "match_fg": [156, 39, 176],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [156, 39, 176]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_purple"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [156, 39, 176],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [156, 39, 176]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_purple"],
    "match_fg": [156, 39, 176],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [156, 39, 176]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_purple"],
    "fg": [156, 39, 176],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_purple"],
    "layer1.texture": "Material Theme/assets/accent-purple/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_purple"],
    "layer0.texture": "Material Theme/assets/accent-purple/find_reverse--hover.png",
  },

/* RED ACCENT
 * =================================================================== */

  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_red"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-red/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_red"],
    "layer0.tint": [229, 115, 115],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_red"],
    "layer0.tint": [229, 115, 115]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_red"],
    "match_fg": [229, 115, 115],
    "selected_match_fg": [229, 115, 115]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_red"],
    "color": [255, 255, 255, 255]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-red/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_red"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [229, 115, 115]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_red"],
    "layer2.texture": "Material Theme/assets/accent-red/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-red/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_red"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-red/folder_opened--hover-0.png",
        "Material Theme/assets/accent-red/folder_opened--hover-1.png",
        "Material Theme/assets/accent-red/folder_opened--hover-2.png",
        "Material Theme/assets/accent-red/folder_opened--hover-3.png",
        "Material Theme/assets/accent-red/folder_opened--hover-4.png",
        "Material Theme/assets/accent-red/folder_opened--hover-5.png",
        "Material Theme/assets/accent-red/folder_opened--hover-5.png",
        "Material Theme/assets/accent-red/folder_opened--hover-5.png",
        "Material Theme/assets/accent-red/folder_opened--hover-6.png",
        "Material Theme/assets/accent-red/folder_opened--hover-6.png",
        "Material Theme/assets/accent-red/folder_opened--hover-6.png",
        "Material Theme/assets/accent-red/folder_opened--hover-6.png",
        "Material Theme/assets/accent-red/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_red"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-red/spinner7.png",
        "Material Theme/assets/accent-red/spinner6.png",
        "Material Theme/assets/accent-red/spinner5.png",
        "Material Theme/assets/accent-red/spinner4.png",
        "Material Theme/assets/accent-red/spinner3.png",
        "Material Theme/assets/accent-red/spinner2.png",
        "Material Theme/assets/accent-red/spinner1.png",
        "Material Theme/assets/accent-red/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-red/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-red/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_red"],
    "match_fg": [229, 115, 115],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [229, 115, 115]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_red"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [229, 115, 115],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [229, 115, 115]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_red"],
    "match_fg": [229, 115, 115],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [229, 115, 115]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_red"],
    "fg": [229, 115, 115],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_red"],
    "layer1.texture": "Material Theme/assets/accent-red/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_red"],
    "layer0.texture": "Material Theme/assets/accent-red/find_reverse--hover.png",
  },

/* ORANGE ACCENT
 * =================================================================== */


  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_orange"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-orange/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_orange"],
    "layer0.tint": [255, 112, 67],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_orange"],
    "layer0.tint": [255, 112, 67]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_orange"],
    "match_fg": [255, 112, 67],
    "selected_match_fg": [255, 112, 67]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_orange"],
    "color": [255, 255, 255, 255]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-orange/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_orange"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [255, 112, 67]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_orange"],
    "layer2.texture": "Material Theme/assets/accent-orange/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-orange/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_orange"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-orange/folder_opened--hover-0.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-1.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-2.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-3.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-4.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-5.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-5.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-5.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-6.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-6.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-6.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-6.png",
        "Material Theme/assets/accent-orange/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-orange/spinner7.png",
        "Material Theme/assets/accent-orange/spinner6.png",
        "Material Theme/assets/accent-orange/spinner5.png",
        "Material Theme/assets/accent-orange/spinner4.png",
        "Material Theme/assets/accent-orange/spinner3.png",
        "Material Theme/assets/accent-orange/spinner2.png",
        "Material Theme/assets/accent-orange/spinner1.png",
        "Material Theme/assets/accent-orange/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-orange/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-orange/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_orange"],
    "match_fg": [255, 112, 67],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 112, 67]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_orange"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [255, 112, 67],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 112, 67]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_orange"],
    "match_fg": [255, 112, 67],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 112, 67]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_orange"],
    "fg": [255, 112, 67],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_orange"],
    "layer1.texture": "Material Theme/assets/accent-orange/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_orange"],
    "layer0.texture": "Material Theme/assets/accent-orange/find_reverse--hover.png",
  },

/* YELLOW ACCENT
 * =================================================================== */


  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_yellow"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-yellow/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_yellow"],
    "layer0.tint": [255, 162, 26],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_yellow"],
    "layer0.tint": [255, 162, 26]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_yellow"],
    "match_fg": [255, 162, 26],
    "selected_match_fg": [255, 162, 26]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_yellow"],
    "color": [0, 0, 0, 150]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-yellow/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_yellow"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [255, 162, 26]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_yellow"],
    "layer2.texture": "Material Theme/assets/accent-yellow/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-yellow/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_yellow"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-yellow/folder_opened--hover-0.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-1.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-2.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-3.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-4.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-5.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-5.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-5.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-6.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-6.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-6.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-6.png",
        "Material Theme/assets/accent-yellow/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-yellow/spinner7.png",
        "Material Theme/assets/accent-yellow/spinner6.png",
        "Material Theme/assets/accent-yellow/spinner5.png",
        "Material Theme/assets/accent-yellow/spinner4.png",
        "Material Theme/assets/accent-yellow/spinner3.png",
        "Material Theme/assets/accent-yellow/spinner2.png",
        "Material Theme/assets/accent-yellow/spinner1.png",
        "Material Theme/assets/accent-yellow/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-yellow/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-yellow/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_yellow"],
    "match_fg": [255, 162, 26],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 162, 26]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_yellow"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [255, 162, 26],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 162, 26]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_yellow"],
    "match_fg": [255, 162, 26],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 162, 26]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_yellow"],
    "fg": [255, 162, 26],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_yellow"],
    "layer1.texture": "Material Theme/assets/accent-yellow/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_yellow"],
    "layer0.texture": "Material Theme/assets/accent-yellow/find_reverse--hover.png",
  },

/* INDIGO ACCENT
 * =================================================================== */

  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_indigo"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-indigo/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_indigo"],
    "layer0.tint": [121, 134, 203]
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_indigo"],
    "layer0.tint": [121, 134, 203]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_indigo"],
    "match_fg": [121, 134, 203],
    "selected_match_fg": [121, 134, 203]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_indigo"],
    "color": [0, 0, 0, 150]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-indigo/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_indigo"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [121, 134, 203]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_indigo"],
    "layer2.texture": "Material Theme/assets/accent-indigo/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-indigo/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_indigo"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-indigo/folder_opened--hover-0.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-1.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-2.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-3.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-4.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-5.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-5.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-5.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-6.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-6.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-6.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-6.png",
        "Material Theme/assets/accent-indigo/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-indigo/spinner7.png",
        "Material Theme/assets/accent-indigo/spinner6.png",
        "Material Theme/assets/accent-indigo/spinner5.png",
        "Material Theme/assets/accent-indigo/spinner4.png",
        "Material Theme/assets/accent-indigo/spinner3.png",
        "Material Theme/assets/accent-indigo/spinner2.png",
        "Material Theme/assets/accent-indigo/spinner1.png",
        "Material Theme/assets/accent-indigo/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-indigo/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-indigo/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_indigo"],
    "match_fg": [121, 134, 203],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [121, 134, 2039]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_indigo"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [121, 134, 203],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [121, 134, 2039]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_indigo"],
    "match_fg": [121, 134, 203],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [121, 134, 2039]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_indigo"],
    "fg": [121, 134, 203],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_indigo"],
    "layer1.texture": "Material Theme/assets/accent-indigo/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_indigo"],
    "layer0.texture": "Material Theme/assets/accent-indigo/find_reverse--hover.png",
  },

/* PINK ACCENT
 * =================================================================== */

  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_pink"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-pink/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_pink"],
    "layer0.tint": [255, 64, 129],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_pink"],
    "layer0.tint": [255, 64, 129]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_pink"],
    "match_fg": [255, 64, 129],
    "selected_match_fg": [255, 64, 129]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_pink"],
    "color": [0, 0, 0, 150]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-pink/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_pink"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [255, 64, 129]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_pink"],
    "layer2.texture": "Material Theme/assets/accent-pink/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-pink/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_pink"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-pink/folder_opened--hover-0.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-1.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-2.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-3.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-4.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-5.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-5.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-5.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-6.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-6.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-6.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-6.png",
        "Material Theme/assets/accent-pink/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-pink/spinner7.png",
        "Material Theme/assets/accent-pink/spinner6.png",
        "Material Theme/assets/accent-pink/spinner5.png",
        "Material Theme/assets/accent-pink/spinner4.png",
        "Material Theme/assets/accent-pink/spinner3.png",
        "Material Theme/assets/accent-pink/spinner2.png",
        "Material Theme/assets/accent-pink/spinner1.png",
        "Material Theme/assets/accent-pink/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-pink/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-pink/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_pink"],
    "match_fg": [255, 64, 129],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 64, 129]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_pink"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [255, 64, 129],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 64, 129]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_pink"],
    "match_fg": [255, 64, 129],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [255, 64, 129]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_pink"],
    "fg": [255, 64, 129],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_pink"],
    "layer1.texture": "Material Theme/assets/accent-pink/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_pink"],
    "layer0.texture": "Material Theme/assets/accent-pink/find_reverse--hover.png",
  },

/* BLUE ACCENT
 * =================================================================== */

  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_blue"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-blue/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_blue"],
    "layer0.tint": [41, 121, 255],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_blue"],
    "layer0.tint": [41, 121, 255]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_blue"],
    "match_fg": [41, 121, 255],
    "selected_match_fg": [41, 121, 255]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_blue"],
    "color": [0, 0, 0, 150]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-blue/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_blue"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [68, 138, 255]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_blue"],
    "layer2.texture": "Material Theme/assets/accent-blue/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-blue/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_blue"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-blue/folder_opened--hover-0.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-1.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-2.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-3.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-4.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-5.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-5.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-5.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-6.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-6.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-6.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-6.png",
        "Material Theme/assets/accent-blue/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-blue/spinner7.png",
        "Material Theme/assets/accent-blue/spinner6.png",
        "Material Theme/assets/accent-blue/spinner5.png",
        "Material Theme/assets/accent-blue/spinner4.png",
        "Material Theme/assets/accent-blue/spinner3.png",
        "Material Theme/assets/accent-blue/spinner2.png",
        "Material Theme/assets/accent-blue/spinner1.png",
        "Material Theme/assets/accent-blue/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-blue/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-blue/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_blue"],
    "match_fg": [68, 138, 255],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [68, 138, 255]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_blue"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [68, 138, 255],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [68, 138, 255]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_blue"],
    "match_fg": [68, 138, 255],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [68, 138, 255]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_blue"],
    "fg": [68, 138, 255],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_blue"],
    "layer1.texture": "Material Theme/assets/accent-blue/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_blue"],
    "layer0.texture": "Material Theme/assets/accent-blue/find_reverse--hover.png",
  },

/* CYAN ACCENT
 * =================================================================== */

  {
    "class": "panel_button_control",
    "settings": ["material_theme_accent_cyan"],
    "attributes": ["hover"],
    "layer0.texture": "Material Theme/assets/accent-cyan/overflow_menu--hover.png",
  },

  // Tooltip

  {
    "class": "tool_tip_control",
    "settings": ["material_theme_accent_cyan"],
    "layer0.tint": [0, 188, 212],
  },

  {
    "class": "progress_gauge_control",
    "settings": ["material_theme_accent_cyan"],
    "layer0.tint": [0, 188, 212]
  },

  {
    "class": "auto_complete_label",
    "settings": ["material_theme_accent_cyan"],
    "match_fg": [0, 188, 212],
    "selected_match_fg": [0, 188, 212]
  },

  {
    "class": "tool_tip_label_control",
    "settings": ["material_theme_accent_cyan"],
    "color": [0, 0, 0, 150]
  },

    // Sidebar tree highlight

  {
    "class": "tree_row",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/tree_highlight.png",
  },

    // Tabs

  {
    "class": "tab_control",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/tab_current.png",
  },

    // Tabs close button

  {
    "class": "tab_close_button",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/close_icon--hover.png",
    "layer3.texture": "Material Theme/assets/accent-cyan/dirty_icon--hover.png"
  },

    // Opened files

  {
    "class": "close_button",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/close_icon--hover.png",
  },

    // Dirty opened files

  {
    "class": "close_button",
    "attributes": ["dirty"],
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/dirty_icon--hover.png",
  },

  {
    "class": "sidebar_label",
    "settings": ["material_theme_accent_cyan"],
    "parents": [{"class": "tree_row", "attributes": ["expanded"]}],
    "color": [38, 198, 218]
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_cyan"],
    "layer2.texture": "Material Theme/assets/accent-cyan/folder--hover.png",
    "layer3.texture": "Material Theme/assets/accent-cyan/folder_opened--hover.png",
  },

  {
    "class": "icon_folder",
    "settings": ["material_theme_accent_cyan"],
    "parents": [{ "class": "tree_row", "attributes": ["expanded", "hover"] }],
    "layer3.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-cyan/folder_opened--hover-0.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-1.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-2.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-3.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-4.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-5.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-5.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-5.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-6.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-6.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-6.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-6.png",
        "Material Theme/assets/accent-cyan/folder_opened--hover-7.png",
      ],
      "loop": false,
      "frame_time": 0.020,
    }
  },

    // Folder loading

  {
    "class": "icon_folder_loading",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture":
    {
      "keyframes":
      [
        "Material Theme/assets/accent-cyan/spinner7.png",
        "Material Theme/assets/accent-cyan/spinner6.png",
        "Material Theme/assets/accent-cyan/spinner5.png",
        "Material Theme/assets/accent-cyan/spinner4.png",
        "Material Theme/assets/accent-cyan/spinner3.png",
        "Material Theme/assets/accent-cyan/spinner2.png",
        "Material Theme/assets/accent-cyan/spinner1.png",
        "Material Theme/assets/accent-cyan/spinner.png",
      ],
      "loop": true,
      "frame_time": 0.075,
    },
  },

    // tab set scroll left | scroll right

  {
    "class": "scroll_tabs_left_button",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/arrow_left--hover.png",
  },

  {
    "class": "scroll_tabs_right_button",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/arrow_right--hover.png",
  },


  {
    "class": "fold_button_control",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/commons/fold_right.png",
    "layer1.texture": "Material Theme/assets/accent-cyan/fold_right--hover.png",
  },

  {
    "class": "fold_button_control",
    "attributes": ["expanded"],
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/darker/fold_down.png",
    "layer1.texture": "Material Theme/assets/accent-cyan/fold_down--hover.png"
  },

  // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_cyan"],
    "match_fg": [38, 198, 218],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [38, 198, 218]
  },

    // Panel labels

  {
    "class": "quick_panel_label",
    "settings": ["material_theme_accent_cyan"],
    "parents": [{"class": "overlay_control"}],
    "match_fg": [38, 198, 218],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [38, 198, 218]
  },

    // Panels sublabels

  {
    "class": "quick_panel_path_label",
    "settings": ["material_theme_accent_cyan"],
    "match_fg": [38, 198, 218],
    "selected_fg": [255, 255, 255, 255],
    "selected_match_fg": [38, 198, 218]
  },

    // Panels data / score

  {
    "class": "quick_panel_score_label",
    "settings": ["material_theme_accent_cyan"],
    "fg": [38, 198, 218],
    "selected_fg": [255, 255, 255, 255]
  },

  {
    "class": "show_tabs_dropdown_button",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/overflow_menu--hover.png",
  },

    // Textline input oveflow menu

  {
    "class": "dropdown_button_control",
    "settings": ["material_theme_accent_cyan"],
    "layer1.texture": "Material Theme/assets/accent-cyan/overflow_menu--hover.png",
  },

  /* Buttons icons settings
  ===================================================================== */

    // Regex Icon
  {
    "class": "icon_regex",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_regex--hover.png",
  },

    // Preserve case sensitive

  {
    "class": "icon_case",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_case--hover.png",
  },
    // Wholeword

  {
    "class": "icon_whole_word",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_word--hover.png",
  },

    // Wrap

  {
    "class": "icon_wrap",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_wrap--hover.png",
  },

    // In selection

  {
    "class": "icon_in_selection",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_inselection--hover.png",
  },


    // Highlight Result

  {
    "class": "icon_highlight",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_highlight--hover.png",
  },

    // Preserve Case

  {
    "class": "icon_preserve_case",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/replace_preserve_case--hover.png",
  },

    // Show context

  {
    "class": "icon_context",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_context--hover.png",
  },

    // Use buffer

  {
    "class": "icon_use_buffer",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/use_buffer--hover.png",
  },

    // Reverse direction

  {
    "class": "icon_reverse",
    "settings": ["material_theme_accent_cyan"],
    "layer0.texture": "Material Theme/assets/accent-cyan/find_reverse--hover.png",
  },
