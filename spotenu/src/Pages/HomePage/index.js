import React, { useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import {
  PageContainer
} from '../../style';

import HomePremium from './components/HomePremium';
import HomeAdmin from './components/HomeAdmin';
import HomeBand from './components/HomeBand';
import HomeFree from './components/HomeFree';

const HomePage = () => {

  usePrivatePage();

  const { profile } = useContext(ProfileContext);

  const profileHome = () => {
    const { role } = profile;
    switch (role.toLowerCase()) {
      case 'premium':
        return <HomePremium />
      case 'admin':
        return <HomeAdmin />
      case 'band':
        return <HomeBand />
      case 'free':
        return <HomeFree />
      default:
        return <>Erro</>
    }
  }

  return (
    <PageContainer>
      <Header />
      {profile ? profileHome() : <></>}
      <Footer />
    </PageContainer>
  );
};

export default HomePage;