import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import SongDetail from '../../components/SongDetail';

import { usePrivatePage } from '../../hooks';
import { getSongsByMusicGenre } from '../../request';
import { ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
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
  GenreSongsPageContainer,
  ResultWrapper
} from './style';

const GenreSongsPage = () => {

  usePrivatePage();

  const pathParams = useParams();

  const [songs, setSongs] = useState(undefined);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [showSongDetail, setShowSongDetail] = useState(false);
  const [songDetailId, setSongDetailId] = useState(undefined);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getSongs(page);
  }, [setCount, setSongs, pathParams, page]);

  const getSongs = async (page) => {
    try {
      const response = await getSongsByMusicGenre(pathParams.genreId, page);
      setCount(Math.ceil(response.quantity / 10));
      setSongs(response.songs);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para ouvintes');
        setShowMessage(true);
      }
    }
  }

  const handleChange = (event, value) => {
    setSongs(undefined);
    setPage(value);
  }

  const goToSongDetail = (songId) => {
    setShowSongDetail(true);
    setSongDetailId(songId);
  }

  return (
    <PageContainer>
      <Header />
      {songs ? 
        <GenreSongsPageContainer>
          {songs.length ? (
            <ResultWrapper>
              <PageList>
                {songs.map((item) => {
                  const { id, name } = item;
                  return (
                    <PageListItem key={id} onClick={() => goToSongDetail(id)} >
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
          )}
        </GenreSongsPageContainer> 
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
  )
};

export default GenreSongsPage;