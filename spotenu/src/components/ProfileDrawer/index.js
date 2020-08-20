import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import { useForm } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { editProfile } from '../../request';
import {
  FormFormControl,
  FormTextField,
  FormButton
} from '../../style';

import {
  ProfileDrawerContainer,
  ProfileDrawerInputAdornment,
  ProfileDrawerIconButton,
  ProfileDrawerConfirm,
  ProfileDrawerCancel
} from './style';

const ProfileDrawer = () => {

  const { profile } = useContext(ProfileContext);

  const { form, onChange, resetForm } = useForm({
    name: profile.name
  });

  const [showEditProfile, setShowEditProfile] = useState(false);

  const history = useHistory();

  const { name } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitEditProfile = () => {
    setShowEditProfile(false);
  }

  const logOut = () => {
    window.localStorage.clear();
    history.push('/login');
  }

  return (
    <ProfileDrawerContainer> 
      {!showEditProfile ?
        <p onClick={() => setShowEditProfile(true)} >Edit Profile</p>
      : 
        <FormFormControl>
          <FormTextField 
            name='name'
            value={name}
            label='Novo nome'
            type='text'
            onChange={handleInputChange}
            variant='outlined'
            color='primary'
            required
            InputProps={{
              endAdornment: (
                <ProfileDrawerInputAdornment>
                  <ProfileDrawerIconButton onClick={resetForm} >
                    <ProfileDrawerCancel color='secondary' />
                  </ProfileDrawerIconButton>
                  <ProfileDrawerIconButton onClick={submitEditProfile} >
                    <ProfileDrawerConfirm color='secondary' />
                  </ProfileDrawerIconButton>
                </ProfileDrawerInputAdornment>
              )
            }}
          />
        </FormFormControl>
      }
      <FormButton
        onClick={logOut}
        variant='contained'
        color='primary'
      >
        Log Out
      </FormButton>
    </ProfileDrawerContainer>
  );
};

export default ProfileDrawer;