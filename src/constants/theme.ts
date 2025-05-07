import colors from './colors';

export const lightTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.light,
    card: colors.white,
    text: colors.dark,
    border: colors.secondary,
    notification: colors.danger,
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: '#6c8fc7',
    background: '#121212',
    card: '#1e1e1e',
    text: colors.light,
    border: colors.dark,
    notification: colors.danger,
  },
};