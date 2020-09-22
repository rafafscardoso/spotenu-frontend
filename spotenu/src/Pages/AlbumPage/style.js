import styled from 'styled-components';
import {} from '@material-ui/core';

export const AlbumPageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
  } 
`