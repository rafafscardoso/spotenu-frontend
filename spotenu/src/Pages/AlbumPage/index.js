import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { getAlbumById, createSong } from '../../request';
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
  AlbumPageContainer,
} from './style';

const AlbumPage = () => {

  usePrivatePage();

  const history = useHistory();

  const pathParams = useParams();

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const [album, setAlbum] = useState(undefined);
  const [showCreateSong, setShowCreateSong] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  useEffect(() => {
    getAlbum();
  }, [setAlbum, pathParams.albumId, update]);

  const getAlbum = async () => {
    try {
      const response = await getAlbumById(pathParams.albumId);
      setAlbum(response.album);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitCreateSong = async (event) => {
    event.preventDefault();
    const name = form.name;
    const albumId = album.id;
    const body = { name, albumId };
    try {
      await createSong(body);
      setShowCreateSong(false);
      setUpdate(!update);
      resetForm();
    } catch (error) {
      console.error(error.response);
    }
  }

  const musicGenresToString = () => {
    if (album) {
      const genres = album.musicGenres;
      if (genres.length === 3) {
        return `${genres[0].name}, ${genres[1].name}, ${genres[2].name}`;
      } else if (genres.length === 2) {
        return `${genres[0].name}, ${genres[1].name}`;
      } else if (genres.length === 1) {
        return `${genres[0].name}`;
      }
    }
    return;
  }

  return (
    <PageContainer>
      <Header />
      {album ?
        <AlbumPageContainer>
          <div>
            <h3>{album.name}</h3>
            <h4>{album.creatorBandName}</h4>
            <p>{musicGenresToString()}</p>
          </div>
          <PageDivider />
          {showCreateSong && (
            <form onSubmit={submitCreateSong} >
              <FormFormControl>
                <FormTextField 
                  name='name'
                  value={form.name}
                  label='Nome da música'
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
                onClick={() => setShowCreateSong(false)}
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
            {showCreateSong || (
              <PageListItem button onClick={() => setShowCreateSong(true)} >
                <PageListItemIcon>
                  <AddIcon />
                </PageListItemIcon>
                <PageListItemText primary='Nova música' />
              </PageListItem>
            )}
            <PageDivider />
            {album.songs.map((item) => {
              const { id, name } = item;
              return (
                <PageListItem key={id} onClick={() => history.push(`/song/${id}`)} >
                  <PageListItemText primary={name} />
                  <ArrowFwdIcon color='primary' />
                </PageListItem>
              )
            })}
          </PageList>
        </AlbumPageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  )
};

export default AlbumPage;