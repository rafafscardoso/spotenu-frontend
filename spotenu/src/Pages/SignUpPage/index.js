import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm, } from '../../hooks';
import { signUp } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton
} from '../../style';

import {
  SignUpPageContainer,
  SignUpInputAdornment,
  SignUpIconButton,
  SignUpVisibilityOn,
  SignUpVisibilityOff
} from './style';

const SignUpPage = () => {

  usePublicPage();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { name, nickname, email, password, confirmPassword } = form;

  const submitSignUp = async (event) => {
    event.preventDefault();
    const device = `${navigator.platform}.${navigator.appCodeName}`;
    if (password !== confirmPassword) {
      setIsPasswordConfirmed(false);
      return;
    }
    const body = { name, nickname, email, password, device };
    try {
      const response = await signUp(body);
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
      <SignUpPageContainer onSubmit={submitSignUp} >
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
                  <SignUpInputAdornment position='end' >
                    <SignUpIconButton onClick={() => setShowPassword(!showPassword)} >
                      {showPassword ? <SignUpVisibilityOn color='secondary' /> : <SignUpVisibilityOff color='secondary' />}
                    </SignUpIconButton>
                  </SignUpInputAdornment>
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
                  <SignUpInputAdornment position='end' >
                    <SignUpIconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                      {showConfirmPassword ? <SignUpVisibilityOn color='secondary' /> : <SignUpVisibilityOff color='secondary' />}
                    </SignUpIconButton>
                  </SignUpInputAdornment>
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
      </SignUpPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default SignUpPage;