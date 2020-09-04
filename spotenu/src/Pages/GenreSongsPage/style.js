import styled from 'styled-components';
import {} from '@material-ui/core';

export const GenreSongsPageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
`
export const QueryResultWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > :nth-child(2) {
    align-self: center;
  }
`