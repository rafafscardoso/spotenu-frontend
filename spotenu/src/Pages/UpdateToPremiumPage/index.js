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
  UpdateToPremiumPageContainer
} from './style';

const UpdateToPremiumPage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  return (
    <PageContainer>
      <Header />
      <UpdateToPremiumPageContainer>
        UpdateToPremiumPage
      </UpdateToPremiumPageContainer>
      <Footer />
    </PageContainer>
  );
};

export default UpdateToPremiumPage;