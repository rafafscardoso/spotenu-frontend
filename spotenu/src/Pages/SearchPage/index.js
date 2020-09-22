import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import SongDetail from '../../components/SongDetail';

import { usePrivatePage, useForm } from '../../hooks';
import { getSongsByQuery, getAllMusicGenres, getAllPlaylistsByUser } from '../../request';
import { ProfileContext, GenreContext, PlaylistContext } from '../../contexts';
import { SearchIcon, CancelIcon, ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormInputAdornment,
  FormIconButton,
  FormButton,
  PageList,
  PageListItem,
  PageListItemText,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
  PagePagination
} from '../../style';

import {
  SearchPageContainer,
  ResultWrapper
} from './style';

const SearchPage = () => {

  usePrivatePage();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    query: ''
  });

  const { profile } = useContext(ProfileContext);
  const { musicGenres, setMusicGenres } = useContext(GenreContext);
  const { setPlaylists } = useContext(PlaylistContext);
  
  const [songs, setSongs] = useState(undefined);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [isQueried, setIsQueried] = useState(false);
  const [showSongDetail, setShowSongDetail] = useState(false);
  const [songDetailId, setSongDetailId] = useState(undefined);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (!musicGenres) {
      getGenres();
    }
  }, [setMusicGenres]);

  useEffect(() => {
    if (profile.role.toLowerCase() === 'premium') {
      getPlaylists();
    }
  }, [setPlaylists]);

  const getGenres = async () => {
    try {
      const response = await getAllMusicGenres();
      setMusicGenres(response.musicGenres);
    } catch (error) {
      console.error(error.response);
    }
  }

  const getPlaylists = async () => {
    try {
      const response = await getAllPlaylistsByUser(0);
      setPlaylists(response.playlists);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const handleChange = (event, value) => {
    setSongs(undefined);
    setPage(value);
    submitSongsByQuery(value);
  }

  const submitSongsByQuery = async (page) => {
    try {
      const response = await getSongsByQuery(form.query, page);
      setCount(Math.ceil(response.quantity / 10));
      setSongs(response.songs);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para ouvintes');
        setShowMessage(true);
      }
    }
  };

  const submitQuery = (event) => {
    event.preventDefault();
    setIsQueried(true);
    submitSongsByQuery(page);
  }

  const clearQuery = () => {
    resetForm();
    setIsQueried(false);
    setSongs(undefined);
    setCount(0);
    setPage(1);
  }

  const goToSongDetail = (songId) => {
    setSongDetailId(songId);
    setShowSongDetail(true);
  }

  return (
    <PageContainer>
      <Header />
      {musicGenres ? 
        <SearchPageContainer>
          <form onSubmit={submitQuery} >
            <FormFormControl>
              <FormTextField
                name='query'
                value={form.query}
                label='Busque aqui'
                placeholder='Busque uma música pelo nome'
                type='text'
                onChange={handleInputChange}
                variant='outlined'
                color='primary'
                required
                InputProps={{
                  startAdornment: (
                    <FormInputAdornment>
                      <SearchIcon color='secondary' />
                    </FormInputAdornment>
                  ),
                  endAdornment: (
                    <FormInputAdornment>
                      {form.query && (
                        <FormIconButton onClick={clearQuery} >
                          <CancelIcon color='secondary' />
                        </FormIconButton>
                      )}
                    </FormInputAdornment>
                  )
                }}
              />
            </FormFormControl>
          </form>
          {songs ? (
            songs.length ? (
              <ResultWrapper>
                <PageList>
                  {songs.map((item) => {
                    const { id, name } = item;
                    return (
                      <PageListItem key={id} button onClick={() => goToSongDetail(id)} >
                        <PageListItemText primary={name} />
                        <ArrowFwdIcon color='primary' />
                      </PageListItem>
                    )
                  })}
                </PageList>
                {count ?
                  <PagePagination 
                    count={count} 
                    page={page} 
                    onChange={handleChange} 
                  />
                : <></>}
              </ResultWrapper>
            ) : (
              <div>{'Não encontramos nada :('}</div>
            )
          ) : (isQueried ? (
            <Loading />
          ) : (
            <PageList>
              {musicGenres.map((item) => {
                const { id, name } = item;
                return (
                  <PageListItem key={id} button onClick={() => history.push(`/genre/${id}`)} >
                    <PageListItemText primary={name} />
                    <ArrowFwdIcon color='primary' />
                  </PageListItem>
                )
              })}
            </PageList>
          ))}
        </SearchPageContainer> 
      : <Loading />} 
      {showSongDetail && <SongDetail songId={songDetailId} control={{ showSongDetail, setShowSongDetail }} />}
      <PageDialog open={showMessage} onClose={() => setShowMessage(false)} >
        <PageDialogContent>
          <PageDialogContentText>{message}</PageDialogContentText>
        </PageDialogContent>
        <PageDialogActions>
          <FormButton onClick={() => setShowMessage(false)} >
            Ok
          </FormButton>
        </PageDialogActions>
      </PageDialog>
      <Footer />
    </PageContainer>
  );
}

export default SearchPage;