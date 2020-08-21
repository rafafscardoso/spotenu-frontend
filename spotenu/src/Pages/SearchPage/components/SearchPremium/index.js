import React from 'react';

import {
  SearchPremiumContainer
} from './style';

const SearchPremium = (props) => {

  const [page, setPage] = props.page;

  const { queryList } = props;
  console.log(queryList)
  
  return (
    <SearchPremiumContainer>
      {(queryList.song && queryList.album && queryList.playlist) &&
        ((!queryList.song.length && !queryList.album.length && !queryList.playlist.length) ? 'Não achei' : 'Achei') 
      }
    </SearchPremiumContainer>
  );
};

export default SearchPremium;