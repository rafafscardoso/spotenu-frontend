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
  FormIconButton
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
  const [update, setUpdate] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  useEffect(() => {
    getPlaylists();
  }, [setPlaylists, update]);

  const getPlaylists = async () => {
    try {
      const response = await getAllPlaylistsByUser(page);
      setPlaylists(response.playlists);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitCreatePlaylist = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await createPlaylist(body);
      setUpdate(!update);
      setShowCreatePlaylist(false);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <PageContainer>
      <Header />
      {playlists ? 
        <UserPlaylistsPageContainer>
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
        </UserPlaylistsPageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  )
};

export default UserPlaylistsPage;