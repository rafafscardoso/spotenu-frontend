import React from 'react';

import {
  SearchFreeContainer
} from './style';

const SearchFree = (props) => {

  const [page, setPage] = props.page;

  const { queryList } = props;

  return (
    <SearchFreeContainer>
      SearchFree
    </SearchFreeContainer>
  );
};

export default SearchFree;