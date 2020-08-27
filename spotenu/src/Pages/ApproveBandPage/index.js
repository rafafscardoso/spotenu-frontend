import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getAllBands, approveBand } from '../../request';
import {
  PageContainer,
  FormIconButton
} from '../../style';

import {
  ApproveBandPageContainer,
  ApproveBandList,
  ApproveBandListItem,
  ApproveBandListItemText,
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
            <ApproveBandList>
              {bands.filter((item) => !item.isApproved).map((item) => {
                const { id, name } = item;
                return (
                  <ApproveBandListItem key={id} >
                    <ApproveBandListItemText primary={name} />
                    <FormIconButton edge='end' onClick={() => submitApproveBand(id)} >
                      <ApproveIcon />
                    </FormIconButton>
                  </ApproveBandListItem>
                )
              })}
            </ApproveBandList>
            <h3>Artistas já aprovados</h3>
            <ApproveBandList>
              {bands.filter((item) => item.isApproved).map((item) => {
                const { id, name } = item;
                return (
                  <ApproveBandListItem key={id} >
                    <ApproveBandListItemText primary={name} />
                  </ApproveBandListItem>
                )
              })}
            </ApproveBandList>
          </div>
        : <></>}
      </ApproveBandPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default ApproveBandPage;