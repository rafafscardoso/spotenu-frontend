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
  PageListItemText
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
    } catch (error) {
      console.error(error.response);
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
      <Footer />
    </PageContainer>
  );
}

export default MusicGenrePage;