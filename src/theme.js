import { responsiveFontSizes } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
  palette: {
    text: {
      corporate: '#F3BA2F',
      important: '#33CC99',
    },
    background: {
      main: '#26272F',
      secondary: '#383C47',
      linearGradient: 'linear-gradient(#383C47, #2C2F38)',
      linearGradientHover: 'linear-gradient(#F3BA2F, #2C2F38)',
    },
  },
});

export default responsiveFontSizes(theme);
