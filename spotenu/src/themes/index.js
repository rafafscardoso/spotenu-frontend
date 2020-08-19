import { createMuiTheme } from '@material-ui/core/styles';

export const MyTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#f47d1f",
      contrastText: '#45525b'
    },
    secondary: {
      main: '#a8bac5',
      contrastText: '#f5f2d0'
    }
  }
});