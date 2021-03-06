import React, { useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm } from '../../hooks';
import { createBand } from '../../request';
import { VisibilityOnIcon, VisibilityOffIcon } from '../../icons';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions
} from '../../style';

import {
  CreateBandPageContainer
} from './style';

const CreateBandPage = () => {

  usePublicPage();

  const { form, onChange, resetForm } = useForm({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { name, nickname, email, password, confirmPassword, description } = form;

  const submitCreateBand = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setIsPasswordConfirmed(false);
      return;
    }
    const body = { name, nickname, email, password, description };
    try {
      await createBand(body);
      resetForm();
      setShowMessage(true);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <PageContainer>
      <Header />
      <CreateBandPageContainer onSubmit={submitCreateBand} >
        <div>
          <FormFormControl>
            <FormTextField 
              name='name'
              value={name}
              label='Nome'
              type='text'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
            />
          </FormFormControl>
          <FormFormControl>
            <FormTextField 
              name='nickname'
              value={nickname}
              label='Apelido'
              type='text'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
            />
          </FormFormControl>
          <FormFormControl>
            <FormTextField 
              name='email'
              value={email}
              label='Email'
              type='email'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
              inputProps={{
                pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                title: 'Email inválido'
              }}
            />
          </FormFormControl>
          <FormFormControl>
            <FormTextField 
              name='description'
              value={description}
              label='Descrição'
              type='text'
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
            />
          </FormFormControl>
          <FormFormControl>
            <FormTextField 
              name='password'
              value={password}
              label='Senha'
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
              inputProps={{
                minLength: 6,
                title: 'Mínimo 6 caracteres'
              }}
              InputProps={{
                endAdornment: (
                  <FormInputAdornment position='end' >
                    <FormIconButton onClick={() => setShowPassword(!showPassword)} >
                      {showPassword ? <VisibilityOnIcon color='secondary' /> : <VisibilityOffIcon color='secondary' />}
                    </FormIconButton>
                  </FormInputAdornment>
                )
              }}
            />
          </FormFormControl>
          <FormFormControl>
            <FormTextField 
              name='confirmPassword'
              value={confirmPassword}
              label='Confirme a senha'
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              variant='outlined'
              color='primary'
              required
              error={!isPasswordConfirmed}
              helperText={isPasswordConfirmed ? null : 'Senha deve ser igual a informada acima'}
              inputProps={{
                minLength: 6,
                title: 'Mínimo 6 caracteres'
              }}
              InputProps={{
                endAdornment: (
                  <FormInputAdornment position='end' >
                    <FormIconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                      {showConfirmPassword ? <VisibilityOnIcon color='secondary' /> : <VisibilityOffIcon color='secondary' />}
                    </FormIconButton>
                  </FormInputAdornment>
                )
              }}
            />
          </FormFormControl>
          <FormButton
            type='submit'
            variant='contained'
            color='primary'
          >
            Cadastrar
          </FormButton>
        </div>
      </CreateBandPageContainer>
      <PageDialog open={showMessage} onClose={() => setShowMessage(false)} >
        <PageDialogContent>
          <PageDialogContentText>Banda criada com sucesso, aguardando aprovação</PageDialogContentText>
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
};

export default CreateBandPage;