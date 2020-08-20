import styled from 'styled-components';
import {} from '@material-ui/core';
import {
  ArrowBackIos
} from '@material-ui/icons';

export const HeaderContainer = styled.header`
  /* position: fixed;
  top: 0; */
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  height: 4rem;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2rem 1fr 4rem;
  > div {
    margin: 0 1rem;
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
  > div:last-of-type {
    grid-row: 1 / span 1;
    grid-column: 3 / span 1;
  }
`
export const HeaderArrowBack = styled(ArrowBackIos)`
  cursor: pointer;
`