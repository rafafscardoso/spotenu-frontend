import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { getAlbumById, createSong, deleteAlbum } from '../../request';
import { AddIcon, CancelIcon, ArrowFwdIcon, DeleteIcon } from '../../icons';
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
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

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
      if (error.response.status === 401) {
        setMessage('Não acessível para administrador');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Álbum não encontrado');
        setShowMessage(true);
      }
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
      if (error.response.status === 401) {
        setMessage('Acessível apenas para artista');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Álbum não encontrado');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Album was not created by this band') {
        setMessage('Álbum não foi criado por esta banda');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Song already exists in this album') {
        setMessage('Música já existente neste álbum');
        setShowMessage(true);
      }
    }
  }

  const submitDeleteAlbum = async (albumId) => {
    try {
      await deleteAlbum(albumId);
      history.push('/album/band');
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para artista');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Álbum não encontrado');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Album was not created by this band') {
        setMessage('Álbum não foi criado por esta banda');
        setShowMessage(true);
      }
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
            <div>
              <h3>Nome: {album.name}</h3>
              <h4>Artista: {album.creatorBandName}</h4>
              <p>Gênero: {musicGenresToString()}</p>
            </div>
            <FormIconButton onClick={() => submitDeleteAlbum(album.id)} >
              <DeleteIcon />
            </FormIconButton>
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
                <PageListItem key={id} button onClick={() => history.push(`/song/${id}`)} >
                  <PageListItemText primary={name} />
                  <ArrowFwdIcon color='primary' />
                </PageListItem>
              )
            })}
          </PageList>
        </AlbumPageContainer>
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

export default AlbumPage;