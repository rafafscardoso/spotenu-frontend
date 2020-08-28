import React, { useState, useContext } from 'react';

import ProfileDrawer from '../ProfileDrawer';

import { ProfileContext } from '../../../../contexts';

import {
  ProfileAvatarContainer,
  ProfileAvatarAvatar,
  ProfileAvatarDrawer
} from './style';

const ProfileAvatar = () => {

  const [showDrawer, setShowDrawer] = useState(false);

  const { profile } = useContext(ProfileContext);

  const { id, name, role } = profile;

  const avatar = () => {
    const splittedName = name.split(' ');
    if (splittedName.length > 1) {
      return `${splittedName[0].charAt(0)}${splittedName[splittedName.length - 1].charAt(0)}`;
    }
    return name.charAt(0);
  }

  return (
    <ProfileAvatarContainer>
      <ProfileAvatarAvatar onClick={() => setShowDrawer(true)} >{avatar()}</ProfileAvatarAvatar>
      <ProfileAvatarDrawer anchor='right' open={showDrawer} onClose={() => setShowDrawer(false)} >
        <ProfileDrawer />
      </ProfileAvatarDrawer> 
    </ProfileAvatarContainer>
  );
}

export default ProfileAvatar;