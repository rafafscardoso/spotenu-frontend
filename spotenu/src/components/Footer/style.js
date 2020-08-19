import styled from 'styled-components';
import {
  Button
} from '@material-ui/core';
import {
  HomeOutlined,
  PersonOutlined,
  SearchOutlined,
  AlbumOutlined
} from '@material-ui/icons';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  margin: 0 1rem;
  height: 4rem;
  width: 100%;
  max-width: 388px;
  > div {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #a8bac5;
  }
`
export const FooterButton = styled(Button)`
  && {
    width: 30%;
    height: 90%;
  }
`
export const FooterHome = styled(HomeOutlined)`
  && {
    font-size: 2rem;
  }
`
export const FooterProfile = styled(PersonOutlined)`
  && {
    font-size: 2rem;
  }
`
export const FooterSearch = styled(SearchOutlined)`
  && {
    font-size: 2rem;
  }
`
export const FooterAlbum = styled(AlbumOutlined)`
  && {
    font-size: 2rem;
  }
`