import React, { useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {} from '../../request';
import {
  PageContainer
} from '../../style';

import {
  ProfilePageContainer
} from './style';

const ProfilePage = () => {

  return (
    <PageContainer>
      <Header />
      <ProfilePageContainer>
        ProfilePage
      </ProfilePageContainer>
      <Footer />
    </PageContainer>
  );
};

export default ProfilePage;