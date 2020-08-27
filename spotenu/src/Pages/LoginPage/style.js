import styled from 'styled-components';
import {} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

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
      color: #f6af56;
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
export const VisibilityOnIcon = styled(Visibility)`
`
export const VisibilityOffIcon = styled(VisibilityOff)`
`