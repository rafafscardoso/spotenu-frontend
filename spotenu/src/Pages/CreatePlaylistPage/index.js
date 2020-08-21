import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import {} from '../../request';
import {
  PageContainer
} from '../../style';

import {
  CreatePlaylistPageContainer
} from './style';

const CreatePlaylistPage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  return (
    <PageContainer>
      <Header />
      <CreatePlaylistPageContainer>
        CreatePlaylistPage
      </CreatePlaylistPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default CreatePlaylistPage;