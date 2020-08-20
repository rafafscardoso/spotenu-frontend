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
  LibraryMusicOutlined
} from '@material-ui/icons';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  grid-row: 1 / span 1;
  grid-column: 3 / span 1;
  height: 4rem;
  width: 100%;
  > div {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`
export const FooterBottomNavigation = styled(BottomNavigation)`
`
export const FooterBottomNavigationAction = styled(BottomNavigationAction)`
`
export const FooterButton = styled(Button)`
  && {
    width: 30%;
    height: 90%;
  }
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