import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePublicPage, useForm, } from '../../hooks';
import { createBand } from '../../request';
import { 
  PageContainer, 
  FormFormControl,
  FormTextField,
  FormButton
} from '../../style';

import {
  CreateBandPageContainer,
  CreateBandInputAdornment,
  CreateBandIconButton,
  CreateBandVisibilityOn,
  CreateBandVisibilityOff
} from './style';

const CreateBandPage = () => {

  usePublicPage();

  const history = useHistory();

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const { name, nickname, email, password, confirmPassword, description } = form;

  const submitCreateBand = async (event) => {
    event.preventDefault();
    const device = `${navigator.platform}.${navigator.appCodeName}`;
    if (password !== confirmPassword) {
      setIsPasswordConfirmed(false);
      return;
    }
    const body = { name, nickname, email, password, description, device };
    try {
      const response = await createBand(body);
      console.log(response);
      resetForm();
      window.alert('Banda criada com sucesso, aguardando aprovação');
    } catch (error) {
      console.error(error);
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
                  <CreateBandInputAdornment position='end' >
                    <CreateBandIconButton onClick={() => setShowPassword(!showPassword)} >
                      {showPassword ? <CreateBandVisibilityOn color='secondary' /> : <CreateBandVisibilityOff color='secondary' />}
                    </CreateBandIconButton>
                  </CreateBandInputAdornment>
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
                  <CreateBandInputAdornment position='end' >
                    <CreateBandIconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                      {showConfirmPassword ? <CreateBandVisibilityOn color='secondary' /> : <CreateBandVisibilityOff color='secondary' />}
                    </CreateBandIconButton>
                  </CreateBandInputAdornment>
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
      <Footer />
    </PageContainer>
  );
}

export default CreateBandPage;