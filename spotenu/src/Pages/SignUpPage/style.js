import styled from 'styled-components';
import {} from '@material-ui/core';

export const SignUpPageContainer = styled.form`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: grid;
  place-items: center;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
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
  }
`