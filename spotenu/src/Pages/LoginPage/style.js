import styled from 'styled-components';
import {} from '@material-ui/core';

export const LoginPageContainer = styled.form`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: grid;
  place-items: center;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    > p {
      color: #45525b;
      align-self: flex-end;
      margin: 1rem 0 0 0;
      font-size: .75rem;
      > span {
        text-decoration: underline;
        :hover {
          cursor: pointer;
          color: #f7f7f7;
          background-color: #45525b;
          text-decoration: none;
        }
      }
    }
  }
`