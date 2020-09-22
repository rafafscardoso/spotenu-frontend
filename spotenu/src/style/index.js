import styled from 'styled-components';
import {
  MuiThemeProvider,
  FormControl,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Menu,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background-color: #f7f7f7;
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
export const FormMenuItem = styled(MenuItem)`
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
export const PageList = styled(List)`
`
export const PageListItem = styled(ListItem)`
`
export const PageListItemText = styled(ListItemText)`
`
export const PageListItemIcon = styled(ListItemIcon)`
`
export const PageDivider = styled(Divider)`
`
export const PageMenu = styled(Menu)`
`
export const PageDialog = styled(Dialog)`
`
export const PageDialogContent = styled(DialogContent)`
`
export const PageDialogContentText = styled(DialogContentText)`
`
export const PageDialogActions = styled(DialogActions)`
`
export const PagePagination = styled(Pagination)`
`