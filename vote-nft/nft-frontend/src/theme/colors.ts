const mycolors = {
  dark: {
    surface: ['#00000a', '#282828', '#5e5e5e', '#777e90', '#e6e8ec', '#e6e8ec'],
    text: {
      primary: '#fcfcfd',
      secondary: '#777e90',
      passive: '#b1b5c3',
      disabled: '#353945',
    },
    active: 'rgba(255, 255, 255, 0.7)',
    divider: '#353945',
    depth: 'rgba(0, 0, 0, 0.24)',
    menu: {
      itemHighlight: 'rgba(255, 255, 255, 0.08)',
    },
  },
  light: {
    surface: ['#fcfcfd', '#f4f5f6', '#e6e8ec', '#e6e8ec', '#737478', '#ff0000'],
    text: {
      primary: '#828282',
      secondary: '#777e90',
      passive: '#959595',
      disabled: '#9ea5b8',
    },
    active: 'rgba(0, 0, 0, 0.7)',
    divider: 'rgba(0, 0, 0, 0.08)',
    depth: 'rgba(255, 255, 255, 0.75)',
    menu: {
      itemHighlight: 'rgba(0, 0, 0, 0.08)',
    },
  },

  primary: {
    main: '#0c76bf',
    dark: '#09588f',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#26c5eb',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#ef466f',
    dark: '#d63e65',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FF9800',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#9757d7',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#45b26b',
    contrastText: '#FFFFFF',
  },

  menu: {
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
};


export default mycolors;