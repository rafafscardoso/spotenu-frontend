import styled from 'styled-components';
import {
  BottomNavigation,
  BottomNavigationAction,
  Button
} from '@material-ui/core';
import {
  HomeOutlined,
  PersonOutlined,
  SearchOutlined,
  AlbumOutlined,
  LibraryMusicOutlined,
  MusicNoteOutlined,
  SupervisorAccountOutlined,
  PaymentOutlined,
  ThumbUpOutlined
} from '@material-ui/icons';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  grid-row: 1 / span 1;
  grid-column: 3 / span 1;
  height: 4rem;
  width: 100%;
`
export const FooterBottomNavigation = styled(BottomNavigation)`
  && {
    height: 100%
  }
`
export const FooterBottomNavigationAction = styled(BottomNavigationAction)`
`
export const HomeIcon = styled(HomeOutlined)`
`
export const SearchIcon = styled(SearchOutlined)`
`
export const AlbumIcon = styled(AlbumOutlined)`
`
export const PlaylistIcon = styled(LibraryMusicOutlined)`
`
export const MusicIcon = styled(MusicNoteOutlined)`
`
export const AdminIcon = styled(SupervisorAccountOutlined)`
`
export const UpdateIcon = styled(PaymentOutlined)`
`
export const ApproveIcon = styled(ThumbUpOutlined)`
`