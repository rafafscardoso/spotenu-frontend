import styled from 'styled-components';
import {} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

export const CreateAdminPageContainer = styled.form`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: grid;
  place-items: center;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`
export const VisibilityOnIcon = styled(Visibility)`
`
export const VisibilityOffIcon = styled(VisibilityOff)`
`