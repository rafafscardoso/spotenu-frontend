import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getSongById } from '../../request';
import {
  PageContainer
} from '../../style';

import SongBand from './components/SongBand';
import SongPremium from './components/SongPremium';
import SongFree from './components/SongFree';

const SongPage = () => {

  usePrivatePage();

  const { profile } = useContext(ProfileContext);

  const pathParams = useParams();

  const [song, setSong] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getSong();
  }, [setSong, update]);

  const getSong = async () => {
    try {
      const response = await getSongById(pathParams.songId);
      setSong(response.song);
    } catch (error) {
      console.error(error.response);
    }
  }

  const profileSong = () => {
    const { role } = profile;
    switch (role.toLowerCase()) {
      case 'premium':
        return <SongPremium song={song} />
      case 'band':
        return <SongBand song={song} updateState={[update, setUpdate]} />
      case 'free':
        return <SongFree song={song} />
      default:
        return <>ERRO</>
    }
  }

  return (
    <PageContainer>
      <Header />
      {song ? (
        profile && profileSong()
      ) : <Loading />}
      <Footer />
    </PageContainer>
  );
};

export default SongPage;