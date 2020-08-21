import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm } from '../../hooks';
import { signUp } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton
} from '../../style';

import {
  SignUpPageContainer,
  VisibilityOnIcon,
  VisibilityOffIcon
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
    if (password !== confirmPassword) {
      setIsPasswordConfirmed(false);
      return;
    }
    const body = { name, nickname, email, password };
    try {
      const response = await signUp(body);
      console.log(response);
      resetForm();
      history.push('/home');
    } catch (error) {
      console.error(error.response);
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
      </SignUpPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default SignUpPage;