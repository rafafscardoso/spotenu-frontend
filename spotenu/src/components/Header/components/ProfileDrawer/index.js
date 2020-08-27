import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import { useForm } from '../../../../hooks';
import { ProfileContext } from '../../../../contexts';
import { editProfile } from '../../../../request';
import {
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton
} from '../../../../style';

import {
  ProfileDrawerContainer,
  ProfileDrawerAvatar,
  ConfirmIcon,
  CancelIcon
} from './style';

const ProfileDrawer = () => {

  const { profile, setProfile } = useContext(ProfileContext);

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
    setProfile(undefined);
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
                <FormInputAdornment>
                  <FormIconButton onClick={resetForm} >
                    <CancelIcon color='secondary' />
                  </FormIconButton>
                  <FormIconButton onClick={submitEditProfile} >
                    <ConfirmIcon color='secondary' />
                  </FormIconButton>
                </FormInputAdornment>
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