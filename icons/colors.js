const iconsColors ={
  colors: {
    // Specific files
    actionscript: {
      pink: 'FF00FF'
    }
  },
  replaceColor: function (content, hex) {
    return content.replace('#000', '#' + hex);
  },
  replacePath: function (path, colorKey) {
    return path.replace(/\.svg/, '.svg');
  }
}

/*
default: {
          green: '90A959',
          blue: '6A9FB5',
          blueDesaturated: '78909C',
          red: 'AC4142',
          redLight: 'D14748',
          maroon: 'AB7558',
          limeGreen: 'B8E15E',
          greenTea: '2ECC71',
          purple: 'AA759F',
          purpleDark: '8251A8',
          yellow: 'F4BF75',
          teal: '80CBC4',
          orange: 'D28445',
        }
*/

export default iconsColors;