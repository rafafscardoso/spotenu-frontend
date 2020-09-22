import styled from 'styled-components';
import {} from '@material-ui/core';

export const ApproveBandPageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > :nth-child(2) {
    align-self: center;
  }
`