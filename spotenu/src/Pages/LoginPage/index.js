import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm } from '../../hooks';
import { login } from '../../request';
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
  LoginPageContainer
} from './style';

const LoginPage = () => {

  usePublicPage();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { username, password } = form;

  const submitLogin = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await login(body);
      resetForm();
      history.push('/home');
    } catch (error) {
      console.error(error.response);
      if (error.response.data.message.toLowerCase() === 'incorrect password') {
        setIsPasswordCorrect(false);
      }
      if (error.response.status === 401) {
        setMessage('Artista deve ser aprovado para poder acessar');
        setShowMessage(true);
        resetForm();
      }
      if (error.response.status === 404) {
        setMessage('Usuário não encontrado');
        setShowMessage(true);
        resetForm();
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      <LoginPageContainer onSubmit={submitLogin}>
        <div>
          <FormFormControl>
            <FormTextField 
              name='username'
              value={username}
              label='Email ou apelido'
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
              error={!isPasswordCorrect}
              helperText={isPasswordCorrect ? null : 'Senha inválida'}
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
          <FormButton
            type='submit'
            variant='contained'
            color='primary'
          >
            Entrar
          </FormButton>
          <p>Não possui cadastro ainda? <span onClick={() => history.push('/signup')} >Clique aqui</span></p>
          <p>É um artista? <span onClick={() => history.push('/create/band')} >Clique aqui</span></p>
        </div>
      </LoginPageContainer>
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

export default LoginPage;