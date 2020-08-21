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

import {
  HomePageContainer
} from './style';

const HomePage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const profileHome = () => {
    const { role } = profile;
    switch (role) {
      case 'PREMIUM':
        return <HomePremium />
      case 'ADMIN':
        return <HomeAdmin />
      case 'BAND':
        return <HomeBand />
      case 'FREE':
        return <HomeFree />
      default:
        return <></>
    }
  }

  return (
    <PageContainer>
      <Header />
      <HomePageContainer>
        {profile ? profileHome() : <></>}
      </HomePageContainer>
      <Footer />
    </PageContainer>
  );
}

export default HomePage;