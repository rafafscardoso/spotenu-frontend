import React from 'react';
import ReactLoading from 'react-loading';

import {
  LoadingContainer
} from './style';

const Loading = () => {
  return (
    <LoadingContainer>
      <ReactLoading type={'spokes'} color={'#fd7d00'} />
    </LoadingContainer>
  );
};

export default Loading;