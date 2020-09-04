import styled from 'styled-components';
import {
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';

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