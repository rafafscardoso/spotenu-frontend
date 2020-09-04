import { createMuiTheme } from '@material-ui/core/styles';

export const MyTheme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: "#fd7d00",
      contrastText: '#000'
    },
    secondary: {
      main: '#45525b',
      contrastText: '#f7f7f7'
    }
  }
});