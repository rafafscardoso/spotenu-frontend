import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { getPlaylistById, removeSongFromPlaylist, editPlaylist, publishPlaylist } from '../../request';
import { EditIcon, CancelIcon, DeleteIcon, PublicIcon } from '../../icons';
import {
  PageContainer,
  PageList,
  PageListItem,
  PageListItemText,
  PageDivider,
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
  PagePagination
} from '../../style';

import {
  PlaylistPageContainer,
  PlaylistWrapper
} from './style';

const PlaylistPage = () => {

  usePrivatePage();

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const pathParams = useParams();

  const [playlist, setPlaylist] = useState(undefined);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showEditPlaylist, setShowEditPlaylist] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getPlaylist(page);
  }, [setPlaylist, update, pathParams.playlistId, page]);

  const getPlaylist = async (page) => {
    try {
      const response =  await getPlaylistById(pathParams.playlistId, page);
      setCount(Math.ceil(response.playlist.quantity / 10));
      setPlaylist(response.playlist);
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
    setPage(value);
    setPlaylist(undefined);
    getPlaylist(value);
  }

  const submitEditPlaylist = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await editPlaylist(pathParams.playlistId, body);
      setUpdate(!update);
      setShowEditPlaylist(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === 'Playlist is not followed by user') {
        setMessage('Playlist não é seguida por usuário');
        setShowMessage(true);
      }
    }
  };

  const submitPublishPlaylist = async () => {
    const { id } = playlist;
    try {
      await publishPlaylist(id);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Playlist not created by user') {
        setMessage('Playlist não foi criada pelo usuário');
        setShowMessage(true); 
      }
      if (error.response.data.message === 'Playlist has already been published') {
        setMessage('Playlist já foi publicada');
        setShowMessage(true); 
      }
    }
  }

  const submitRemoveSongFromPlaylist = async (songId) => {
    const { id } = playlist;
    try {
      await removeSongFromPlaylist(id, songId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Playlist is not followed by user') {
        setMessage('Playlist não é seguida por usuário');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Song is not in this playlist') {
        setMessage('Música não está nessa playlist');
        setShowMessage(true);
      }
    }
  }

  const clickEditButton = () => {
    setShowEditPlaylist(true);
    onChange('name', playlist.name);
  }

  return (
    <PageContainer>
      <Header />
      {playlist ?
        <PlaylistPageContainer>
          <div>
            <PlaylistWrapper>
              {showEditPlaylist ? (
                <form onSubmit={submitEditPlaylist} >
                  <FormFormControl>
                    <FormTextField 
                      name='name'
                      value={form.name}
                      label='Novo nome da playlist'
                      type='text'
                      onChange={handleInputChange}
                      variant='outlined'
                      color='primary'
                      required
                      autoFocus
                      InputProps={{
                        endAdornment: (
                          <FormInputAdornment>
                            {form.name &&
                              <FormIconButton onClick={resetForm}>
                                <CancelIcon />
                              </FormIconButton>
                            }
                          </FormInputAdornment>
                        )
                      }}
                    />
                  </FormFormControl>
                  <FormButton
                    onClick={() => setShowEditPlaylist(false)}
                    variant='outlined'
                    color='secondary'
                  >
                    Cancelar
                  </FormButton>
                  <FormButton
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Salvar
                  </FormButton>
                </form>
              ) : (
                <div>
                  <h3>{playlist.name}</h3>
                  <FormIconButton onClick={clickEditButton} >
                    <EditIcon />
                  </FormIconButton>
                </div>
              )}
              <h4>{playlist.userName}</h4>
              <div>
                {playlist.isPrivate ? <p>Playlist Privada</p> : <p>Playlist Pública</p>}
                {playlist.isPrivate && (
                  <FormIconButton onClick={submitPublishPlaylist} >
                    <PublicIcon />
                  </FormIconButton>
                )}
              </div>
            </PlaylistWrapper>
            <PageDivider />
            <PageList>
              {playlist.songs.map((item) => {
                const { id, name, albumName, creatorBandName } = item;
                return (
                  <PageListItem key={id} >
                    <PageListItemText primary={name} secondary={`${albumName} - ${creatorBandName}`} />
                    <FormIconButton edge='end' onClick={() => submitRemoveSongFromPlaylist(id)} >
                      <DeleteIcon />
                    </FormIconButton>
                  </PageListItem>
                )
              })}
            </PageList>
          </div>
          {count ? 
            <PagePagination 
              count={count}
              page={page}
              onChange={handleChange}
            />
          : <></>}
        </PlaylistPageContainer>
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
}

export default PlaylistPage;