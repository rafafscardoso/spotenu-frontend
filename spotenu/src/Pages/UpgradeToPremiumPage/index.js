import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getAllListeners, upgradeToPremium } from '../../request';
import {
  PageContainer,
  FormIconButton
} from '../../style';

import {
  UpgradeToPremiumPageContainer,
  UpgradeToPremiumList,
  UpgradeToPremiumListItem,
  UpgradeToPremiumListItemText,
  UpgradeIcon
} from './style';

const UpgradeToPremiumPage = () => {

  const { setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const [listeners, setListeners] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getAllListeners()
      .then(response => {
        setListeners(response.listeners);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [setListeners, update]);

  const submitUpgradeToPremium = (userId) => {
    upgradeToPremium(userId)
      .then(response => {
        console.log(response);
        setUpdate(!update);
      })
      .catch(error => {
        console.error(error.response);
      })
  }

  return (
    <PageContainer>
      <Header />
      <UpgradeToPremiumPageContainer>
        {listeners ? 
          <div>
            <h3>Usuários ouvintes não pagantes</h3>
            <UpgradeToPremiumList>
              {listeners.filter((item) => item.role.toLowerCase() === 'free').map((item) => {
                const { id, name } = item;
                return (
                  <UpgradeToPremiumListItem key={id} >
                    <UpgradeToPremiumListItemText primary={name} />
                    <FormIconButton onClick={() => submitUpgradeToPremium(id)} >
                      <UpgradeIcon />
                    </FormIconButton>
                  </UpgradeToPremiumListItem>
                )
              })}
            </UpgradeToPremiumList>
            <h3>Usuários ouvintes pagantes</h3>
            <UpgradeToPremiumList>
              {listeners.filter((item) => item.role.toLowerCase() === 'premium').map((item) => {
                const { id, name } = item;
                return (
                  <UpgradeToPremiumListItem key={id} >
                    <UpgradeToPremiumListItemText primary={name} />
                  </UpgradeToPremiumListItem>
                )
              })}
            </UpgradeToPremiumList>
          </div>
        : <></>}
      </UpgradeToPremiumPageContainer>
      <Footer />
    </PageContainer>
  );
};

export default UpgradeToPremiumPage;