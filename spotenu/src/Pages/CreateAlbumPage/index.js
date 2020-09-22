import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { createAlbum, getAllMusicGenres } from '../../request';
import { CancelIcon } from '../../icons';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormMenuItem,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
} from '../../style';

import {
  CreateAlbumPageContainer
} from './style';

const CreateAlbumPage = () => {

  usePrivatePage();

  const history = useHistory();

  const { form, onChange } = useForm({
    name: '',
    firstGenre: '',
    secondGenre: '',
    thirdGenre: ''
  });

  const [genresList, setGenresList] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  const { name, firstGenre, secondGenre, thirdGenre } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  useEffect(() => {
    getGenres();
  }, [setGenresList]);

  const getGenres = async () => {
    try {
      const response = await getAllMusicGenres();
      setGenresList(response.musicGenres);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitCreateAlbum = async (event) => {
    event.preventDefault();
    const musicGenres = [{ id: firstGenre }];
    if (secondGenre) {
      musicGenres.push({ id: secondGenre });
      if (thirdGenre) {
        musicGenres.push({ id: thirdGenre });
      }
    }
    const body = { name, musicGenres };
    try {
      await createAlbum(body);
      history.push('/album/band');
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para artista');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Music genre invalid') {
        setMessage('Gênero musical inválido');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {genresList ?
        <CreateAlbumPageContainer>
          <form onSubmit={submitCreateAlbum} >
            <FormFormControl>
              <FormTextField 
                name='name'
                value={name}
                label='Nome do álbum'
                type='text'
                onChange={handleInputChange}
                variant='outlined'
                color='primary'
                required
                autoFocus
                InputProps={{
                  endAdornment: (
                    <FormInputAdornment>
                      {name &&
                        <FormIconButton onClick={() => onChange('name', '')}>
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
                name='firstGenre'
                value={firstGenre}
                label='Selecione um gênero musical'
                onChange={handleInputChange}
                variant='outlined'
                color='primary'
                required
              >
                <FormMenuItem value='' />
                {genresList.map((item) => {
                  const { id, name } = item;
                  return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
                })}
              </FormTextField>
            </FormFormControl>
            {firstGenre && (
              <FormFormControl>
                <FormTextField
                  select
                  name='secondGenre'
                  value={secondGenre}
                  label='Selecione um gênero musical'
                  onChange={handleInputChange}
                  variant='outlined'
                  color='primary'
                >
                  <FormMenuItem value='' ></FormMenuItem>
                  {genresList.map((item) => {
                    const { id, name } = item;
                    return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
                  })}
                </FormTextField>
              </FormFormControl>
            )}
            {secondGenre && (
              <FormFormControl>
                <FormTextField
                  select
                  name='thirdGenre'
                  value={thirdGenre}
                  label='Selecione um gênero musical'
                  onChange={handleInputChange}
                  variant='outlined'
                  color='primary'
                >
                  <FormMenuItem value='' ></FormMenuItem>
                  {genresList.map((item) => {
                    const { id, name } = item;
                    return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
                  })}
                </FormTextField>
              </FormFormControl>
            )}
            <FormButton
              type='submit'
              variant='contained'
              color='primary'
            >
              Cadastrar
            </FormButton>
          </form>
        </CreateAlbumPageContainer>
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

export default CreateAlbumPage;