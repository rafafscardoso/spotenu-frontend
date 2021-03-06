import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getBandsToApprove, approveBand } from '../../request';
import { ApproveIcon } from '../../icons';
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
  ApproveBandPageContainer
} from './style';

const ApproveBandPage = () => {

  usePrivatePage();

  const [bands, setBands] = useState(undefined);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getBands(page);
  }, [setBands, update, page]);

  const getBands = async (page) => {
    try {
      const response = await getBandsToApprove(page);
      setCount(Math.ceil(response.quantity / 10));
      setBands(response.bands);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para administrador');
        setShowMessage(true);
      }
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
    setBands(undefined);
    getBands(value);
  }

  const submitApproveBand = async (bandId) => {
    try {
      await approveBand(bandId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para administrador');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Artista não encontrado');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Band has already been approved') {
        setMessage('Artista já aprovado');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {bands ?
        <ApproveBandPageContainer>
          <div>
            <h3>Artistas para serem aprovados</h3>
            <PageList>
              {bands.map((item) => {
                const { id, name } = item;
                return (
                  <PageListItem key={id} >
                    <PageListItemText primary={name} />
                    <FormIconButton edge='end' onClick={() => submitApproveBand(id)} >
                      <ApproveIcon />
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
        </ApproveBandPageContainer>
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
}

export default ApproveBandPage;