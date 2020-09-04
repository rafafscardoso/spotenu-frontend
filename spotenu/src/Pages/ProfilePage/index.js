import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { editProfile, getProfile } from '../../request';
import { CancelIcon, EditIcon } from '../../icons';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton
} from '../../style';

import {
  ProfilePageContainer
} from './style';

const ProfilePage = () => {

  usePrivatePage();

  const { profile, setProfile } = useContext(ProfileContext);

  const { form, onChange, resetForm } = useForm({
    name: ''
  });

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [update, setUpdate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getProf();
  }, [update]);

  const getProf = async () => {
    try {
      const response = await getProfile();
      setProfile(response.user);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitEditProfile = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await editProfile(body);
      setShowEditProfile(false);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
    }
  }

  const logOut = () => {
    window.localStorage.clear();
    setProfile(undefined);
    history.push('/login');
  }

  return (
    <PageContainer>
      <Header />
      {profile ? 
        <ProfilePageContainer>
          <div>
            {showEditProfile ? (
              <form onSubmit={submitEditProfile} >
                <FormFormControl>
                  <FormTextField 
                    name='name'
                    value={form.name}
                    label='Novo nome'
                    type='text'
                    onChange={handleInputChange}
                    variant='outlined'
                    color='primary'
                    required
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <FormInputAdornment>
                          {form.name &&
                            <FormIconButton onClick={resetForm}>
                              <CancelIcon />
                            </FormIconButton>
                          }
                        </FormInputAdornment>
                      )
                    }}
                  />
                </FormFormControl>
                <FormButton
                  onClick={() => setShowEditProfile(false)}
                  variant='outlined'
                  color='secondary'
                >
                  Cancelar
                </FormButton>
                <FormButton
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Salvar
                </FormButton>
              </form>
            ) : (
              <div>
                <h4>Nome: {profile.name}</h4>
                <FormIconButton onClick={() => {
                  setShowEditProfile(true);
                  onChange('name', profile.name);
                }} >
                  <EditIcon />
                </FormIconButton>
              </div>
            )}
            <p>Apelido: {profile.nickname}</p>
            <p>Email: {profile.email}</p>
          </div>
          <FormButton
            onClick={logOut}
            variant='outlined'
            color='primary'
          >
            Log Out
          </FormButton>
        </ProfilePageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  )
};

export default ProfilePage;