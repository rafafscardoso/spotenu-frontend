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
  FormIconButton
} from '../../style';

import {
  PlaylistPageContainer
} from './style';

const PlaylistPage = () => {

  usePrivatePage();

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const pathParams = useParams();

  const [playlist, setPlaylist] = useState(undefined);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(false);
  const [showEditPlaylist, setShowEditPlaylist] = useState(false);

  useEffect(() => {
    getPlaylist();
  }, [setPlaylist, update, pathParams.playlistId, page]);

  const getPlaylist = async () => {
    try {
      const response =  await getPlaylistById(pathParams.playlistId, page);
      setPlaylist(response.playlist);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitEditPlaylist = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await editPlaylist(pathParams.playlistId, body);
      setUpdate(!update);
      setShowEditPlaylist(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitPublishPlaylist = async () => {
    const { id } = playlist;
    try {
      await publishPlaylist(id);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitRemoveSongFromPlaylist = async (songId) => {
    const { id } = playlist;
    try {
      await removeSongFromPlaylist(id, songId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <PageContainer>
      <Header />
      {playlist ?
        <PlaylistPageContainer>
            <div>
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
                  <FormIconButton onClick={() => {
                    setShowEditPlaylist(true);
                    onChange('name', playlist.name);
                  }} >
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
            </div>
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
        </PlaylistPageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  );
}

export default PlaylistPage;