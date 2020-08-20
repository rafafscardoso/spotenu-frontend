import styled from 'styled-components';
import {
  InputAdornment,
  IconButton
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

export const CreateBandPageContainer = styled.form`
  padding: 2rem 1rem;
  grid-row: 2 / span 1;
  display: grid;
  place-items: center;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #f6af56;
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
export const CreateBandInputAdornment = styled(InputAdornment)`
`
export const CreateBandIconButton = styled(IconButton)`
`
export const CreateBandVisibilityOn = styled(Visibility)`
`
export const CreateBandVisibilityOff = styled(VisibilityOff)`
`