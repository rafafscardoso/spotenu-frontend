import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getAllPublicPlaylists, followPlaylist } from '../../request';
import { AddPlaylistIcon, PlaylistAddedIcon } from '../../icons';
import {
  PageContainer,
  PageList, 
  PageListItem,
  PageListItemText,
  FormIconButton,
  FormButton,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
  PagePagination
} from '../../style';

import {
  PublicPlaylistsPageContainer
} from './style';

const PublicPlaylistsPage = () => {

  usePrivatePage();

  const [playlists, setPlaylists] = useState(undefined);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getPlaylists(page);
  }, [setPlaylists, update, page]);

  const getPlaylists = async (page) => {
    try {
      const response = await getAllPublicPlaylists(page);
      setPlaylists(response.playlists);
      setCount(Math.ceil(response.quantity / 10));
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
    }
  }

  const handleChange = (event, value) => {
    setPlaylists(undefined);
    setPage(value);
  }

  const submitFollowPlaylist = async (playlistId) => {
    try {
      await followPlaylist(playlistId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Playlist has not been published yet') {
        setMessage('Playlist não foi publicada ainda');
        setShowMessage(true); 
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {playlists ?
        <PublicPlaylistsPageContainer>
          <PageList>
            {playlists.map((item) => {
              const { id, name, userName, isFollowed } = item;
              return (
                <PageListItem key={id} >
                  <PageListItemText primary={name} secondary={userName} />
                  {isFollowed ? <PlaylistAddedIcon color='primary' /> : (
                    <FormIconButton edge='end' onClick={() => submitFollowPlaylist(id)} >
                      <AddPlaylistIcon color='secondary' />
                    </FormIconButton>
                  )}
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
        </PublicPlaylistsPageContainer>
      : <Loading />}
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
};

export default PublicPlaylistsPage;