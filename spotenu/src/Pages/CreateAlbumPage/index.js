import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage, useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { createAlbum, getAllMusicGenres } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormMenuItem,
  FormButton
} from '../../style';

import {
  CreateAlbumPageContainer
} from './style';

const CreateAlbumPage = () => {

  const { setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    name: '',
    firstGenre: '',
    secondGenre: '',
    thirdGenre: ''
  });

  const [genresList, setGenresList] = useState(undefined);

  const { name, firstGenre, secondGenre, thirdGenre } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  useEffect(() => {
    getAllMusicGenres()
      .then(response => {
        setGenresList(response.musicGenres)
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [setGenresList]);

  const submitCreateAlbum = (event) => {
    event.preventDefault();
    const musicGenres = [firstGenre];
    if (secondGenre) {
      musicGenres.push(secondGenre);
      if (thirdGenre) {
        musicGenres.push(thirdGenre);
      }
    }
    const body = { name, musicGenres };
    console.log(body)
    // createAlbum(body)
    //   .then(response => {
    //     console.log(response);
    //     history.push('/album/band')
    //   })
    //   .catch(error => {
    //     console.error(error.response);
    //   });
  }

  return (
    <PageContainer>
      <Header />
      <CreateAlbumPageContainer>
        {genresList ?
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
                <FormMenuItem value='' ></FormMenuItem>
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
        : <></>}
      </CreateAlbumPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default CreateAlbumPage;