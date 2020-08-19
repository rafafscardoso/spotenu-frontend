import React, { useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getProfile } from '../../request';
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

  usePrivatePage();

  const { profile, setProfile } = useContext(ProfileContext);

  const goToGetProfile = async () => {
    try {
      const result = await getProfile();
      console.log(result);
      setProfile(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    goToGetProfile();
  }, [setProfile, getProfile]);

  const profileHome = () => {
    switch (profile.role) {
      case 'PREMIUM':
        return <HomePremium />
      case 'ADMIN':
        return <HomeAdmin />
      case 'BAND':
        return <HomeBand />
      default :
        return <HomeFree />
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