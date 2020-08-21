import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage, useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getSongsByQuery, getAlbumsByQuery, getPlaylistsByQuery } from '../../request';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormInputAdornment,
  FormIconButton
} from '../../style';

import SearchPremium from './components/SearchPremium';
import SearchFree from './components/SearchFree';

import {
  SearchPageContainer,
  SearchIcon,
  CancelIcon
} from './style';

const SearchPage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const { form, onChange, resetForm } = useForm({
    query: ''
  });

  const [isQueried, setIsQueried] = useState(false);

  const [queryList, setQueryList] = useState({
    song: undefined,
    album: undefined,
    playlist: undefined
  });

  const [page, setPage] = useState({
    song: 1,
    album: 1,
    playlist: 1
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { query } = form;

  const submitSongsByQuery = async (page) => {
    try {
      const result = await getSongsByQuery(query, page);
      const song = result.songs;
      setQueryList({ ...queryList, song })
      console.log(result.songs);
    } catch (error) {
      console.error(error.response);
    }
  };

  const submitAlbumsByQuery = async (page) => {
    try {
      const result = await getAlbumsByQuery(query, page);
      const album = result.albums;
      setQueryList({ ...queryList, album });
      console.log(result.albums);
    } catch (error) {
      console.error(error.response);
    }
  };

  const submitPlaylistsByQuery = async (page) => {
    try {
      const result = await getPlaylistsByQuery(query, page);
      const playlist = result.playlists;
      setQueryList({ ...queryList, playlist });
      console.log(result.playlists);
    } catch (error) {
      console.error(error.response);
    }
  };

  const submitQuery = (event) => {
    if (event.key === 'Enter') {
      submitSongsByQuery(page.song);
      submitAlbumsByQuery(page.album);
      submitPlaylistsByQuery(page.playlist);
      setIsQueried(true);
    }
  }

  const clearQuery = () => {
    resetForm();
    setIsQueried(false);
  }

  const profileSearch = () => {
    const { role } = profile;
    switch (role) {
      case 'PREMIUM':
        return <SearchPremium page={[page, setPage]} queryList={queryList} />;
      case 'FREE':
        return <SearchFree page={[page, setPage]} queryList={queryList} />;
      default:
        return <></>;
    }
  }

  return (
    <PageContainer>
      <Header />
      {profile ? 
        <SearchPageContainer>
          <FormFormControl>
            <FormTextField
              name='query'
              value={query}
              label='Busque aqui'
              type='text'
              onChange={handleInputChange}
              onKeyDown={submitQuery}
              variant='outlined'
              color='primary'
              InputProps={{
                startAdornment: (
                  <FormInputAdornment>
                    <SearchIcon color='secondary' />
                  </FormInputAdornment>
                ),
                endAdornment: (
                  <FormInputAdornment>
                    {query && (
                      <FormIconButton onClick={clearQuery} >
                        <CancelIcon color='secondary' />
                      </FormIconButton>
                    )}
                  </FormInputAdornment>
                )
              }}
            />
          </FormFormControl>
          {isQueried && (
            profileSearch()
          )}
        </SearchPageContainer> 
      : <></>}
      <Footer />
    </PageContainer>
  );
}

export default SearchPage;