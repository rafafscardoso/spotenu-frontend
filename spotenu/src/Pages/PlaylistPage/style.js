import styled from 'styled-components';
import {} from '@material-ui/core';

export const PlaylistPageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > :nth-child(2) {
    align-self: center;
  }
`
export const PlaylistWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  > div {
    display: flex;
    justify-content: space-between;
  }
`