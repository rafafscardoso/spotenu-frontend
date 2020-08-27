import styled from 'styled-components';
import {
  Avatar
} from '@material-ui/core';
import {
  CheckCircle,
  Cancel
} from '@material-ui/icons';

export const ProfileDrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
`
export const ProfileDrawerAvatar = styled(Avatar)`
  cursor: pointer;
`
export const ConfirmIcon = styled(CheckCircle)`
`
export const CancelIcon = styled(Cancel)`
`