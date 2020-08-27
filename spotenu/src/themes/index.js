import { createMuiTheme } from '@material-ui/core/styles';

export const MyTheme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: "#f47d1f",
      contrastText: '#000'
    },
    secondary: {
      main: '#45525b',
      contrastText: '#f5f2d0'
    }
  }
});