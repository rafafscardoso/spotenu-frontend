import React, { useContext } from 'react';

import { ProfileContext } from '../../contexts';

import {
  ProfileAvatarContainer
} from './style';

const ProfileAvatar = () => {

  // const { profile, setProfile } = useContext(ProfileContext);

  return (
    <ProfileAvatarContainer>
      Avatar
    </ProfileAvatarContainer>
  );
}

export default ProfileAvatar;