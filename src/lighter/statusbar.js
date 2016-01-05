
/* @ STATUS BAR
 * Status bar settings and behavioring
========================================================================= */

  // All labels

  {
    "class": "label_control",
    "color": [176, 190, 197, 255],
    "shadow_color": [24, 24, 24, 0],
    "shadow_offset": [0, 0],
    "font.bold": true
  },

    // Status bar labels

   {
      "class": "label_control",
      "parents": [{"class": "status_bar"}],
      "color": [144, 164, 174],
      "font.bold": false
  },

    // Text field labels

  {
    "class": "status_bar",

    // Layer 0 base
    "layer0.tint": [250, 250, 250],
    "layer0.opacity": 1.0,
    "layer0.inner_margin": [2, 2],

    // Visible tint layer
    "layer1.tint": [250, 250, 250],
    "layer1.opacity": 1.0,
    "layer1.inner_margin": [2, 2],

    "content_margin": [0, 0]
  },

  {
    "class": "status_container",
    "content_margin": [24, 12, 24, 12],
  },

  {
    "class": "status_button",
    "layer0.tint": [250, 250, 250],
    "layer0.opacity": 1.0,
    "layer0.draw_center": false,
    "layer0.inner_margin": [1, 0, 0, 0],
    "content_margin": [10, 2, 10, 3],
    "min_size": [75, 0]
  },

  {
    "class": "status_button",
    "layer0.tint": [250, 250, 250],
    "layer0.opacity": 1.0,
    "layer0.draw_center": false,
    "layer0.inner_margin": [1, 0, 0, 0],
    "content_margin": [10, 2, 10, 3],
    "min_size": [75, 0],
  },