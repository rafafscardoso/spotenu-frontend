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
export const FooterHome = styled(HomeOutlined)`
`
export const FooterProfile = styled(PersonOutlined)`
`
export const FooterSearch = styled(SearchOutlined)`
`
export const FooterAlbum = styled(AlbumOutlined)`
`
export const FooterPlaylist = styled(LibraryMusicOutlined)`
`
export const FooterMusic = styled(MusicNoteOutlined)`
`
export const FooterCreateAdmin = styled(SupervisorAccountOutlined)`
`
export const FooterUpdate = styled(PaymentOutlined)`
`
export const FooterApproveBand = styled(ThumbUpOutlined)`
`