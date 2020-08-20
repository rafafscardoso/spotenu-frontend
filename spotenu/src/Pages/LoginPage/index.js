import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm } from '../../hooks';
import { login } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton
} from '../../style';

import {
  LoginPageContainer,
  LoginInputAdornment,
  LoginIconButton,
  LoginVisibilityOn,
  LoginVisibilityOff
} from './style';

const LoginPage = () => {

  usePublicPage();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { username, password } = form;

  const submitLogin = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      const response = await login(body);
      console.log(response);
      resetForm();
      history.push('/home');
    } catch (error) {
      console.error(error);
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
              InputProps={{
                endAdornment: (
                  <LoginInputAdornment position='end' >
                    <LoginIconButton onClick={() => setShowPassword(!showPassword)} >
                      {showPassword ? <LoginVisibilityOn color='secondary' /> : <LoginVisibilityOff color='secondary' />}
                    </LoginIconButton>
                  </LoginInputAdornment>
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
      <Footer />
    </PageContainer>
  );
}

export default LoginPage;