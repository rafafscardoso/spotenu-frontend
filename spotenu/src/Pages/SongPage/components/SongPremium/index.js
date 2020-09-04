import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../../../hooks';
import { getAllPlaylistsByUser, addSongToPlaylist } from '../../../../request';
import {
  FormFormControl,
  FormTextField,
  FormButton,
  FormMenuItem
} from '../../../../style';

import {
  SongPageContainer,
  SongDetailWrapper
} from '../../style';

const SongPremium = (props) => {

  const { form, onChange, resetForm } = useForm({
    id: ''
  });

  const pathParams = useParams();

  const [playlists, setPlaylists] = useState(undefined);

  const { name, albumName, creatorBandName } = props.song;

  useEffect(() => {
    getPlaylists();
  }, [setPlaylists]);

  const getPlaylists = async () => {
    try {
      const response = await getAllPlaylistsByUser(0);
      setPlaylists(response.playlists);
    } catch (error) {
      console.error(error.response)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitAddSongToPlaylist = async (event) => {
    event.preventDefault();
    const songId = pathParams.songId;
    const body = { ...form, songId };
    try {
      await addSongToPlaylist(body);
      resetForm();
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <SongPageContainer>
      <SongDetailWrapper>
        <h3>Nome: {name}</h3>
        <h4>Música: {albumName}</h4>
        <p>Artista: {creatorBandName}</p>
      </SongDetailWrapper>
      {playlists && (
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
      )}
    </SongPageContainer>
  );
};

export default SongPremium;