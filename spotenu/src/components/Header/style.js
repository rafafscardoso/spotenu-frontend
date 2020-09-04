import styled from 'styled-components';
import {
  Avatar,
  Divider
} from '@material-ui/core';

export const HeaderContainer = styled.header`
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  height: 4rem;
  width: 100%;
  > div {
    padding: 0 1rem;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2rem 1fr 4rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > div:first-of-type {
      grid-row: 1 / span 1;
      grid-column: 1 / span 1;
    }
    > div:nth-of-type(2) {
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
    }
    > div:nth-of-type(3) {
      grid-row: 1 / span 1;
      grid-column: 3 / span 1;
      justify-self: flex-end;
    }
  }
`
export const HeaderAvatar = styled(Avatar)`
`
export const HeaderDivider = styled(Divider)`
`