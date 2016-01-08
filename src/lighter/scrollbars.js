
/* @ SCROLLBARS
 * Scrollbars settings and behavioring
========================================================================= */

  // Normal Vertical scrollbar track

  {
    "class": "scroll_bar_control",
    "layer0.texture": "Material Theme/assets/lighter/normal_bar_vertical.png",
    "layer0.opacity": 1.0,
    "layer0.inner_margin": [0, 6],
    "blur": false
  },

    // Normal Vertical scrollbar track inside overlay panel

  {
      "class": "scroll_bar_control",
      "parents": [{"class": "overlay_control"}],
      "layer0.tint": [250, 250, 250, 0],
      "layer0.opacity": 1.0,
      "layer0.inner_margin": [0, 6],
      "blur": false
   },

    // Normal horizontal scrollbar track

   {
      "class": "scroll_bar_control",
      "attributes": ["horizontal"],
      "layer0.texture": "Material Theme/assets/lighter/normal_bar_horizontal.png",
      "layer0.opacity": 1.0,
      "layer0.inner_margin": [6, 0],
      "blur": false
   },

    // Normal horizontal scrollbar track inside overlay panel

  {
      "class": "scroll_bar_control",
      "attributes": ["horizontal"],
      "parents": [{"class": "overlay_control"}],
      "layer0.tint": [250, 250, 250, 0],
      "layer0.opacity": 0.0,
      "layer0.inner_margin": [0, 2],
      "blur": false
   },

    // Scrollbars corner

  {
    "class": "scroll_corner_control",
    "layer0.texture": "Material Theme/assets/lighter/normal_bar_corner.png",
    "layer0.opacity": 1.0,
    "layer0.inner_margin": [1, 1]
  },

    // Vertical puck controller

  {
    "class": "puck_control",
    "layer0.tint": [38, 50, 255, 0],
    "layer0.opacity": 1.0,
    "layer0.inner_margin": [10, 10],
    "layer1.texture": "Material Theme/assets/lighter/thumb_vertical.png",
    "layer1.opacity": 1.0,
    "layer1.inner_margin": [8, 8],
    "content_margin": [6, 16],
    "blur": false
  },

    // Horizontal puck controller

  {
    "class": "puck_control",
    "attributes": ["horizontal"],
    "layer0.texture": "Material Theme/assets/lighter/thumb_horizontal.png",
    "layer0.opacity": 1.0,
    "layer0.inner_margin": [10, 0],
    "content_margin": [16, 6],
    "blur": false
  },

  {
    "class": "scroll_area_control",
    "settings": ["overlay_scroll_bars"],
    "overlay": true
  },

  {
    "class": "scroll_area_control",
    "settings": ["!overlay_scroll_bars"],
    "overlay": false // set to false for the original behavior
  },


  {
    "class": "scroll_area_control",
    "parents": [{"class": "overlay_control"}],
    "settings": ["overlay_scroll_bars"],
    "overlay": true // set to false for the original behavior
  },

  {
    "class": "scroll_area_control",
    "parents": [{"class": "sidebar_container"}],
    "settings": ["!overlay_scroll_bars"],
    "overlay": false // set to false for the original behavior
  },

  {
    "class": "scroll_bar_control",
    "settings": ["overlay_scroll_bars"],
    "layer0.texture": "Material Theme/assets/lighter/normal_bar_vertical.png",
    "layer0.inner_margin": [0, 5],
    "blur": true
  },

  {
    "class": "scroll_bar_control",
    "settings": ["overlay_scroll_bars"],
    "attributes": ["horizontal"],
    "layer0.texture": "Material Theme/assets/lighter/normal_bar_horizontal.png",
    "layer0.inner_margin": [5, 0],
    "layer0.opacity": 0.0,
    "layer1.texture": "Material Theme/assets/lighter/normal_bar_horizontal.png",
    "layer1.inner_margin": [5, 0],
    "layer1.opacity": 0.0,
    "blur": true
  },

  {
    "class": "puck_control",
    "layer0.tint": [250, 250, 250],
    "layer0.opacity": 0.0,
    "layer0.inner_margin": [1, 8, 1, 8],
    "layer1.texture": "Material Theme/assets/lighter/thumb_vertical.png",
    "layer1.inner_margin": [1, 8, 1, 8],
    "content_margin": [6, 16],
    "blur": true
  },

  {
    "class": "puck_control",
    "attributes": ["horizontal"],
    "layer0.tint": [250, 250, 250],
    "layer0.opacity": 0.0,
    "layer0.inner_margin": [8, 1, 8, 1],
    "layer1.texture": "Material Theme/assets/lighter/thumb_horizontal.png",
    "layer1.inner_margin": [8, 1, 8, 1],
    "content_margin": [16, 6],
    "blur": true
  },
