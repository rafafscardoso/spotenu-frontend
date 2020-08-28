import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getAllBands, approveBand } from '../../request';
import {
  PageContainer,
  FormIconButton,
  PageList,
  PageListItem,
  PageListItemText
} from '../../style';

import {
  ApproveBandPageContainer,
  ApproveIcon
} from './style';

const ApproveBandPage = () => {

  const { setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const [bands, setBands] = useState(undefined);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getAllBands()
      .then(response => {
        setBands(response.bands);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [setBands, update]);

  const submitApproveBand = (bandId) => {
    approveBand(bandId)
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
      <ApproveBandPageContainer>
        {bands ?
          <div>
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
          </div>
        : <></>}
      </ApproveBandPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default ApproveBandPage;