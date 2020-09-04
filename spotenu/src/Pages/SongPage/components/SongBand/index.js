import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useForm } from '../../../../hooks';
import { ProfileContext } from '../../../../contexts';
import { getAlbumsByBand, editSong } from '../../../../request';
import { EditIcon, CancelIcon } from '../../../../icons';
import {
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  FormMenuItem
} from '../../../../style';

import {
  SongPageContainer,
  EditSongWrapper,
  SongDetailWrapper
} from '../../style';

const SongBand = (props) => {

  const { profile } = useContext(ProfileContext);

  const { form, onChange, resetForm } = useForm({
    name: '',
    albumId: ''
  });

  const pathParams = useParams();

  const [albums, setAlbums] = useState(undefined);
  const [showEditSong, setShowEditSong] = useState(false);

  const { name, albumName, creatorBandName } = props.song;
  const [update, setUpdate] = props.updateState;

  useEffect(() => {
    getAlbums();
  }, [setAlbums]);

  const getAlbums = async () => {
    try {
      const response = await getAlbumsByBand(profile.id);
      setAlbums(response.albums);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitEditSong = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await editSong(pathParams.songId, body);
      setUpdate(!update);
      setShowEditSong(false);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <SongPageContainer>
      {showEditSong ? (
        <form onSubmit={submitEditSong} >
          <FormFormControl>
            <FormTextField 
              name='name'
              value={form.name}
              label='Novo nome da música'
              type='text'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
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
          <FormFormControl>
            <FormTextField
              select
              name='albumId'
              value={form.albumId}
              label='Selecione o novo álbum para a música'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
            >
              <FormMenuItem value='' />
              {albums.map((item) => {
                const { id, name } = item;
                return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
              })}
            </FormTextField>
          </FormFormControl>
          <FormButton
            onClick={() => setShowEditSong(false)}
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
        <EditSongWrapper>
          <SongDetailWrapper>
            <h3>Nome: {name}</h3>
            <h4>Música: {albumName}</h4>
            <p>Artista: {creatorBandName}</p>
          </SongDetailWrapper>
          <FormIconButton onClick={() => {
            setShowEditSong(true);
            onChange('name', name);
          }} >
            <EditIcon />
          </FormIconButton>
        </EditSongWrapper>
      )}
    </SongPageContainer>
  );
};

export default SongBand;