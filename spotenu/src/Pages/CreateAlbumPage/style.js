import styled from 'styled-components';
import {} from '@material-ui/core';
import {} from '@material-ui/icons';

export const CreateAlbumPageContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  > p {
    align-self: flex-end;
    margin: 1rem 0 0 0;
    font-size: .75rem;
    > span {
      text-decoration: underline;
      :hover {
        cursor: pointer;
        color: #45525b;
        background-color: #f47d1f;
        text-decoration: none;
      }
    }
  }
`