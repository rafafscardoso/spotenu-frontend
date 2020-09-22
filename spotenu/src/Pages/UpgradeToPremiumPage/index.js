import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getAllFree, upgradeToPremium } from '../../request';
import { UpgradeIcon } from '../../icons';
import {
  PageContainer,
  FormIconButton,
  FormButton,
  PageList,
  PageListItem,
  PageListItemText,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
  PagePagination
} from '../../style';

import {
  UpgradeToPremiumPageContainer
} from './style';

const UpgradeToPremiumPage = () => {

  usePrivatePage();

  const [free, setFree] = useState(undefined);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getFree(page);
  }, [setFree, update, page]);

  const getFree = async (page) => {
    try {
      const response = await getAllFree(page);
      setCount(Math.ceil(response.quantity / 10));
      setFree(response.free);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleChange = (event, value) => {
    setFree(undefined);
    setPage(value);
  }

  const submitUpgradeToPremium = async (userId) => {
    try {
      await upgradeToPremium(userId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para administrador');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Usuário não encontrado');
        setShowMessage(true);
      }
      if (error.response.data.message === 'User has already been premium') {
        setMessage('Usuário já é premium');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {free ? 
        <UpgradeToPremiumPageContainer>
          <div>
          <h3>Usuários ouvintes não pagantes</h3>
            <PageList>
              {free.map((item) => {
                const { id, name } = item;
                return (
                  <PageListItem key={id} >
                    <PageListItemText primary={name} />
                    <FormIconButton edge='end' onClick={() => submitUpgradeToPremium(id)} >
                      <UpgradeIcon />
                    </FormIconButton>
                  </PageListItem>
                )
              })}
            </PageList>
          </div>
          {count ? 
            <PagePagination 
              count={count}
              page={page}
              onChange={handleChange}
            />
          : <></>}
        </UpgradeToPremiumPageContainer>
      : <Loading />}
      <PageDialog open={showMessage} onClose={() => setShowMessage(false)} >
        <PageDialogContent>
          <PageDialogContentText>{message}</PageDialogContentText>
        </PageDialogContent>
        <PageDialogActions>
          <FormButton onClick={() => setShowMessage(false)} >
            Ok
          </FormButton>
        </PageDialogActions>
      </PageDialog>
      <Footer />
    </PageContainer>
  );
};

export default UpgradeToPremiumPage;