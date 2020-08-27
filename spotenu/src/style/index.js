import styled from 'styled-components';
import {
  MuiThemeProvider,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core';

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  /* background-color: #45525b;
  color: #a8bac5; */
  display: grid;
  grid-template-rows: 4rem 1fr 4rem;
  grid-template-columns: 1fr;
`
export const AppThemeProvider = styled(MuiThemeProvider)`
`
export const FormFormControl = styled(FormControl)`
  && {
    margin: .5rem 0;
  }
`
export const FormTextField = styled(TextField)`
`
export const FormButton = styled(Button)`
  && {
    margin: .5rem 0;
  }
`
export const FormInputAdornment = styled(InputAdornment)`
`
export const FormIconButton = styled(IconButton)`
`