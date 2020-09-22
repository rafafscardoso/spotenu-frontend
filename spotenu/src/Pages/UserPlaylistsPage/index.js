import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { getAllPlaylistsByUser, createPlaylist } from '../../request';
import { AddIcon, CancelIcon, ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
  PageList,
  PageListItem,
  PageListItemText,
  PageListItemIcon,
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
  UserPlaylistsPageContainer
} from './style';

const UserPlaylistsPage = () => {

  usePrivatePage();

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const history = useHistory();

  const [playlists, setPlaylists] = useState(undefined);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  useEffect(() => {
    getPlaylists();
  }, [setPlaylists, update, page]);

  const getPlaylists = async () => {
    try {
      const response = await getAllPlaylistsByUser(page);
      setCount(Math.ceil(response.quantity / 10));
      setPlaylists(response.playlists);
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

  const submitCreatePlaylist = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await createPlaylist(body);
      setUpdate(!update);
      setShowCreatePlaylist(false);
      resetForm();
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para usuário premium');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {playlists ? 
        <UserPlaylistsPageContainer>
          <div>
            {showCreatePlaylist && (
              <form onSubmit={submitCreatePlaylist} >
                <FormFormControl>
                  <FormTextField 
                    name='name'
                    value={form.name}
                    label='Nome da playlist'
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
                  onClick={() => setShowCreatePlaylist(false)}
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
                  Criar
                </FormButton>
              </form>
            )}
            <PageList>
              {showCreatePlaylist || (
                <PageListItem button onClick={() => setShowCreatePlaylist(true)} >
                  <PageListItemIcon>
                    <AddIcon />
                  </PageListItemIcon>
                  <PageListItemText primary='Nova Playlist' />
                </PageListItem>
              )}
              <PageDivider />
              {playlists.map((item) => {
                const { id, name, userName } = item;
                return (
                  <PageListItem key={id} button onClick={() => history.push(`/playlist/${id}`)} >
                    <PageListItemText primary={name} secondary={userName} />
                    <ArrowFwdIcon color='primary' />
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
        </UserPlaylistsPageContainer>
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
  )
};

export default UserPlaylistsPage;