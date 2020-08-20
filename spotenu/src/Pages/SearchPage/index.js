import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage, useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import {} from '../../request';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormInputAdornment,
  FormIconButton
} from '../../style';

import {
  SearchPageContainer,
  SearchIcon,
  CancelIcon
} from './style';

const SearchPage = () => {

  usePrivatePage();

  const { form, onChange, resetForm } = useForm({
    query: ''
  });

  const { profile } = useContext(ProfileContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { query } = form;

  const submitQuery = (event) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      console.log('eu')
    }
  }

  return (
    <PageContainer>
      <Header />
      <SearchPageContainer>
        <FormFormControl>
          <FormTextField
            name='query'
            value={query}
            label='Busque aqui'
            type='text'
            onChange={handleInputChange}
            onKeyDown={submitQuery}
            variant='outlined'
            color='primary'
            InputProps={{
              startAdornment: (
                <FormInputAdornment>
                  <SearchIcon color='secondary' />
                </FormInputAdornment>
              ),
              endAdornment: (
                <FormInputAdornment>
                  {query && <FormIconButton onClick={resetForm} >
                    <CancelIcon color='secondary' />
                  </FormIconButton>}
                </FormInputAdornment>
              )
            }}
          />
        </FormFormControl>
      </SearchPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default SearchPage;