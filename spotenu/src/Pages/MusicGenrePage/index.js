import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { createMusicGenre, getAllMusicGenres } from '../../request';
import { CancelIcon } from '../../icons';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  PageList,
  PageListItem,
  PageListItemText,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
} from '../../style';

import {
  MusicGenrePageContainer
} from './style';

const MusicGenrePage = () => {

  usePrivatePage();

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const [musicGenres, setMusicGenres] = useState(undefined);
  const [update, setUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getGenres();
  }, [setMusicGenres, update]);

  const getGenres = async () => {
    try {
      const response = await getAllMusicGenres();
      setMusicGenres(response.musicGenres);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { name } = form;

  const submitCreateMusicGenre = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await createMusicGenre(body);
      setUpdate(!update);
      resetForm();
      setMessage('Gênero musical criado com sucesso');
      setShowMessage(true);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para administrador');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Music genre has already been created') {
        setMessage('Gênero musical já existente');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {musicGenres ? 
        <MusicGenrePageContainer>
          <form onSubmit={submitCreateMusicGenre} >
            <FormFormControl>
              <FormTextField 
                name='name'
                value={name}
                label='Crie um novo gênero'
                type='text'
                onChange={handleInputChange}
                variant='outlined'
                color='primary'
                autoFocus
                InputProps={{
                  endAdornment: (
                    <FormInputAdornment>
                      {name &&
                        <FormIconButton onClick={resetForm}>
                          <CancelIcon />
                        </FormIconButton>
                      }
                    </FormInputAdornment>
                  )
                }}
              />
              <FormButton
                type='submit'
                variant='contained'
                color='primary'
              >
                Criar
              </FormButton>
            </FormFormControl>
          </form>
          <PageList>
            {musicGenres.map((item) => {
              const { id, name } = item;
              return (
                <PageListItem key={id} >
                  <PageListItemText primary={name} />
                </PageListItem>
              )
            })}
          </PageList>
        </MusicGenrePageContainer> 
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

export default MusicGenrePage;