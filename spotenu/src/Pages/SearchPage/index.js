import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  SearchPageContainer
} from './style';

const SearchPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <SearchPageContainer>
      SearchPage
    </SearchPageContainer>
  );
}

export default SearchPage;