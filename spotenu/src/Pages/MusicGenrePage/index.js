import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage, useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { createMusicGenre, getAllMusicGenres } from '../../request';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormButton,
  PageList,
  PageListItem,
  PageListItemText
} from '../../style';

import {
  MusicGenrePageContainer
} from './style';

const MusicGenrePage = () => {

  const { setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const [musicGenres, setMusicGenres] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getAllMusicGenres()
      .then(response => {
        setMusicGenres(response.musicGenres);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [setMusicGenres, update]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { name } = form;

  const submitCreateMusicGenre = async (event) => {
    event.preventDefault();
    const body = form;
    createMusicGenre(body)
      .then(response => {
        console.log(response);
        setUpdate(!update);
        resetForm();
      })
      .catch(error => {
        console.error(error.response);
      });
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
      : <></>}
      <Footer />
    </PageContainer>
  );
}

export default MusicGenrePage;