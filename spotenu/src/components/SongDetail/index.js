import React, { useState, useEffect, useContext } from 'react';

import Loading from '../Loading';

import { useForm } from '../../hooks';
import { getSongById,  addSongToPlaylist } from '../../request';
import { ProfileContext, PlaylistContext } from '../../contexts';
import { CloseIcon } from '../../icons';
import {
  FormFormControl,
  FormTextField,
  FormButton,
  FormMenuItem,
  FormIconButton,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions
} from '../../style';

import {
  SongDetailDialog,
  SongDetailDialogContent,
  SongDetailDialogActions,
  SongDetailAppBar,
  SongDetailToolbar
} from './style';

const SongDetail = (props) => {

  const { profile } = useContext(ProfileContext);

  const { playlists } = useContext(PlaylistContext);

  const { form, onChange, resetForm } = useForm({
    id: ''
  });

  const [song, setSong] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  const { songId } = props;
  const { showSongDetail, setShowSongDetail } = props.control;

  useEffect(() => {
    getSong();
  }, [setSong]);

  const getSong = async () => {
    try {
      const response = await getSongById(songId);
      setSong(response.song);
    } catch (error) {
      console.error(error.response);
      if (error.response.data.message === 'Not accessible for admin') {
        setMessage('Não é acessível para administrador');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Only accessible for the creator band') {
        setMessage('Acessível apenas pelo artista criador');
        setShowMessage(true);
      }
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitAddSongToPlaylist = async (event) => {
    event.preventDefault();
    const body = { ...form, songId };
    try {
      await addSongToPlaylist(body);
      resetForm();
      setShowSongDetail(false);
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
    }
  }

  return (
    <SongDetailDialog
      fullScreen
      open={showSongDetail}
      onClose={() => setShowSongDetail(false)}
    >
      <SongDetailAppBar>
        <SongDetailToolbar>
          <FormIconButton onClick={() => setShowSongDetail(false)} >
            <CloseIcon />
          </FormIconButton>
        </SongDetailToolbar>
      </SongDetailAppBar>
      {song ? (
        <div>
          <SongDetailDialogContent>
            <h3>Nome: {song.name}</h3>
            <h4>Álbum: {song.albumName}</h4>
            <p>Artista: {song.creatorBandName}</p>
          </SongDetailDialogContent>
          {profile.role.toLowerCase() === 'premium' && (
            <SongDetailDialogActions>
              <form onSubmit={submitAddSongToPlaylist} >
                <FormFormControl>
                  <FormTextField
                    select
                    name='id'
                    value={form.id}
                    label='Selecione a playlist'
                    onChange={handleInputChange}
                    variant='outlined'
                    color='primary'
                    required
                  >
                    <FormMenuItem value='' />
                    {playlists.map((item) => {
                      const { id, name } = item;
                      return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
                    })}
                  </FormTextField>
                </FormFormControl>
                <FormButton
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Adicionar
                </FormButton>
              </form>
            </SongDetailDialogActions>
          )}
        </div>
      ) : <Loading />}
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
    </SongDetailDialog>
  );
};

export default SongDetail;