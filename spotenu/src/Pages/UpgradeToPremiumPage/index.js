import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getAllListeners, upgradeToPremium } from '../../request';
import { UpgradeIcon } from '../../icons';
import {
  PageContainer,
  FormIconButton,
  PageList,
  PageListItem,
  PageListItemText
} from '../../style';

import {
  UpgradeToPremiumPageContainer
} from './style';

const UpgradeToPremiumPage = () => {

  usePrivatePage();

  const [listeners, setListeners] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getListeners();
  }, [setListeners, update]);

  const getListeners = async () => {
    try {
      const response = await getAllListeners();
      setListeners(response.listeners);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitUpgradeToPremium = async (userId) => {
    try {
      await upgradeToPremium(userId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <PageContainer>
      <Header />
      {listeners ? 
        <UpgradeToPremiumPageContainer>
          <h3>Usuários ouvintes não pagantes</h3>
          <PageList>
            {listeners.filter((item) => item.role.toLowerCase() === 'free').map((item) => {
              const { id, name } = item;
              return (
                <PageListItem key={id} >
                  <PageListItemText primary={name} />
                  <FormIconButton onClick={() => submitUpgradeToPremium(id)} >
                    <UpgradeIcon />
                  </FormIconButton>
                </PageListItem>
              )
            })}
          </PageList>
          <h3>Usuários ouvintes pagantes</h3>
          <PageList>
            {listeners.filter((item) => item.role.toLowerCase() === 'premium').map((item) => {
              const { id, name } = item;
              return (
                <PageListItem key={id} >
                  <PageListItemText primary={name} />
                </PageListItem>
              )
            })}
          </PageList>
        </UpgradeToPremiumPageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  );
};

export default UpgradeToPremiumPage;