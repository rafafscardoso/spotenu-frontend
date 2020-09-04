import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getSongsByQuery, getAllMusicGenres } from '../../request';
import { QueryContext, BrowseContext, GenreContext } from '../../contexts';
import { SearchIcon, CancelIcon, ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormInputAdornment,
  FormIconButton,
  PageList,
  PageListItem,
  PageListItemText,
  PagePagination
} from '../../style';

import {
  SearchPageContainer,
  QueryResultWrapper
} from './style';

const SearchPage = () => {

  usePrivatePage();

  const history = useHistory();

  const { querySongs, setQuerySongs, queryCount, setQueryCount, queryPage, setQueryPage, form, onChange, resetForm } = useContext(QueryContext);
  const { setBrowseSongs } = useContext(BrowseContext);
  const { musicGenres, setMusicGenres } = useContext(GenreContext);
  
  const [isQueried, setIsQueried] = useState(false);

  useEffect(() => {
    if (!musicGenres) {
      getGenres();
    }
  }, [setMusicGenres]);

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

  const handleChange = (event, value) => {
    setQueryPage(value);
    setQuerySongs(undefined);
    submitSongsByQuery(value);
  }

  const submitSongsByQuery = async (page) => {
    try {
      const response = await getSongsByQuery(form.query, page);
      setQueryCount(Math.ceil(response.quantity / 10));
      setQuerySongs(response.songs);
    } catch (error) {
      console.error(error.response);
    }
  };

  const submitQuery = (event) => {
    event.preventDefault();
    setIsQueried(true);
    submitSongsByQuery(queryPage);
  }

  const clearQuery = () => {
    resetForm();
    setIsQueried(false);
    setQuerySongs(undefined);
    setQueryCount(0);
    setQueryPage(1);
  }

  return (
    <PageContainer>
      <Header />
      {musicGenres ? 
        <SearchPageContainer>
          <form onSubmit={submitQuery} >
            <FormFormControl>
              <FormTextField
                name='query'
                value={form.query}
                label='Busque aqui'
                placeholder='Busque uma música pelo nome'
                type='text'
                onChange={handleInputChange}
                variant='outlined'
                color='primary'
                required
                InputProps={{
                  startAdornment: (
                    <FormInputAdornment>
                      <SearchIcon color='secondary' />
                    </FormInputAdornment>
                  ),
                  endAdornment: (
                    <FormInputAdornment>
                      {form.query && (
                        <FormIconButton onClick={clearQuery} >
                          <CancelIcon color='secondary' />
                        </FormIconButton>
                      )}
                    </FormInputAdornment>
                  )
                }}
              />
            </FormFormControl>
          </form>
          {querySongs ? (
            querySongs.length ? (
              <QueryResultWrapper>
                <PageList>
                  {querySongs.map((item) => {
                    const { id, name } = item;
                    return (
                      <PageListItem key={id} onClick={() => history.push(`/song/${id}`)} >
                        <PageListItemText primary={name} />
                        <ArrowFwdIcon color='primary' />
                      </PageListItem>
                    )
                  })}
                </PageList>
                {queryCount && 
                  <PagePagination 
                    count={queryCount} 
                    page={queryPage} 
                    onChange={handleChange} 
                  />
                }
              </QueryResultWrapper>
            ) : (
              <div>{'Não encontramos nada :('}</div>
            )
          ) : (isQueried ? (
            <Loading />
          ) : (
            <PageList>
              {musicGenres.map((item) => {
                const { id, name } = item;
                return (
                  <PageListItem key={id} onClick={() => {
                    setBrowseSongs(undefined);
                    history.push(`/genre/${id}`);
                  }} >
                    <PageListItemText primary={name} />
                    <ArrowFwdIcon color='primary' />
                  </PageListItem>
                )
              })}
            </PageList>
          ))}
        </SearchPageContainer> 
      : <Loading />} 
      <Footer />
    </PageContainer>
  );
}

export default SearchPage;