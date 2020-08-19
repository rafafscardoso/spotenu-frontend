import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm, } from '../../hooks';
import { createAlbum } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton
} from '../../style';

import {
  CreateAlbumPageContainer
} from './style';

const CreateAlbumPage = () => {

  usePublicPage();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitCreateAlbum = async (event) => {
    event.preventDefault();
    const device = `${navigator.platform}.${navigator.appCodeName}`;
    const body = {  };
    try {
      const response = await createAlbum(body);
      console.log(response);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PageContainer>
      <Header />
      <CreateAlbumPageContainer onSubmit={submitCreateAlbum} >
        CreateAlbumPage
      </CreateAlbumPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default CreateAlbumPage;