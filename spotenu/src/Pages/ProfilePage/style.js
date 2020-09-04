import styled from 'styled-components';
import {} from '@material-ui/core';

export const ProfilePageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    > form {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`