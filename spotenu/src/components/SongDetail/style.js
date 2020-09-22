import styled from 'styled-components';
import {
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar
} from '@material-ui/core';

export const SongDetailDialog = styled(Dialog)`
`
export const SongDetailDialogContent = styled(DialogContent)`
  > h3 {
  margin-top: 5rem;
  }
`
export const SongDetailDialogActions = styled(DialogActions)`
  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
export const SongDetailAppBar = styled(AppBar)`
  && {
    height: 4rem;
  }
`
export const SongDetailToolbar = styled(Toolbar)`
  && {
    height: 100%;
  }
`