import styled from 'styled-components';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import {
  Search,
  LibraryMusic,
  MusicNote,
  SupervisorAccount,
  ThumbUp,
  Payment
} from '@material-ui/icons';

export const HomePageContainer = styled.div`
  padding: 1rem;
  /* min-height: 100%; */
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export const HomeList = styled(List)`
`
export const HomeListItem = styled(ListItem)`
`
export const HomeListItemIcon = styled(ListItemIcon)`
`
export const HomeListItemText = styled(ListItemText)`
`
export const HomeDivider = styled(Divider)`
`
export const SearchIcon = styled(Search)`
`
export const PlaylistIcon = styled(LibraryMusic)`
`
export const MusicIcon = styled(MusicNote)`
`
export const AdminIcon = styled(SupervisorAccount)`
`
export const ApproveIcon = styled(ThumbUp)`
`
export const UpdateIcon = styled(Payment)`
`