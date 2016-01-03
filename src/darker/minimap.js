
/* @MINIMAP
 * Minimap settings and behavioring
========================================================================= */


  {
    "class": "minimap_control",
    "settings": ["always_show_minimap_viewport"],
    "viewport_color": [255, 255, 255, 50],
    "viewport_opacity": 0.4,
  },

  {
    "class": "minimap_control",
    "settings": ["!always_show_minimap_viewport"],
    "viewport_color": [128, 203, 196, 50],
    "viewport_opacity": { "target": 0.0, "speed": 4.0, "interpolation": "smoothstep" },
  },
  {
    "class": "minimap_control",
    "attributes": ["hover"],
    "settings": ["!always_show_minimap_viewport"],
    "viewport_opacity": { "target": 0.4, "speed": 20.0, "interpolation": "smoothstep" },
  },

