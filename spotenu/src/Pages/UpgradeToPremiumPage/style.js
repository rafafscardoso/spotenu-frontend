import styled from 'styled-components';
import {} from '@material-ui/core';
import {
  MonetizationOn
} from '@material-ui/icons';

export const UpgradeToPremiumPageContainer = styled.div`
  padding: 1rem;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  > div {
    width: 100%;
  }
`
export const UpgradeIcon = styled(MonetizationOn)`
`