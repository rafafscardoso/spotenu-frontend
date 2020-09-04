import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { getAllBands, approveBand } from '../../request';
import { ApproveIcon } from '../../icons';
import {
  PageContainer,
  FormIconButton,
  PageList,
  PageListItem,
  PageListItemText
} from '../../style';

import {
  ApproveBandPageContainer
} from './style';

const ApproveBandPage = () => {

  usePrivatePage();

  const [bands, setBands] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getBands();
  }, [setBands, update]);

  const getBands = async () => {
    try {
      const response = await getAllBands();
      setBands(response.bands);
    } catch (error) {
      console.error(error.response);
    }
  }

  const submitApproveBand = async (bandId) => {
    try {
      await approveBand(bandId);
      setUpdate(!update);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <PageContainer>
      <Header />
      {bands ?
        <ApproveBandPageContainer>
          <h3>Artistas para serem aprovados</h3>
          <PageList>
            {bands.filter((item) => !item.isApproved).map((item) => {
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
          <h3>Artistas já aprovados</h3>
          <PageList>
            {bands.filter((item) => item.isApproved).map((item) => {
              const { id, name } = item;
              return (
                <PageListItem key={id} >
                  <PageListItemText primary={name} />
                </PageListItem>
              )
            })}
          </PageList>
        </ApproveBandPageContainer>
      : <Loading />}
      <Footer />
    </PageContainer>
  );
}

export default ApproveBandPage;