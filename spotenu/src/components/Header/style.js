import styled from 'styled-components';
import {} from '@material-ui/core';
import {
  ArrowBackIos
} from '@material-ui/icons';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  margin: 0 1rem;
  height: 4rem;
  width: 100%;
  max-width: 388px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2rem 1fr 4rem;
  border-bottom: 1px solid #a8bac5;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-of-type {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  > div:last-of-type {
    grid-row: 1 / span 1;
    grid-column: 3 / span 1;
  }
`
export const HeaderArrowBack = styled(ArrowBackIos)`
  cursor: pointer;
`