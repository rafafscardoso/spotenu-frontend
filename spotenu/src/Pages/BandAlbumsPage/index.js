import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { AlbumContext } from '../../contexts';
import { getAlbumsByBand } from '../../request';
import { AddIcon, ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
  FormButton,
  PageList,
  PageListItem,
  PageListItemText,
  PageListItemIcon,
  PageDivider,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions,
} from '../../style';

import {
  BandAlbumsPageContainer
} from './style';

const BandAlbumsPage = () => {

  usePrivatePage();

  const history = useHistory();

  const { albums, setAlbums } = useContext(AlbumContext);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getAlbums();
  }, [setAlbums]);

  const getAlbums = async () => {
    try {
      const response = await getAlbumsByBand();
      setAlbums(response.albums);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para artista');
        setShowMessage(true);
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      {albums ? 
        <BandAlbumsPageContainer>
          <PageList>
            <PageListItem button onClick={() => history.push('/create/album')} >
              <PageListItemIcon>
                <AddIcon />
              </PageListItemIcon>
              <PageListItemText primary='Novo álbum' />
            </PageListItem>
            <PageDivider />
            {albums.map((item) => {
              const { id, name, creatorBandName } = item;
              return (
                <PageListItem key={id} button onClick={() => history.push(`/album/${id}`)} >
                  <PageListItemText primary={name} secondary={creatorBandName} />
                  <ArrowFwdIcon color='primary' />
                </PageListItem>
              )
            })}
          </PageList> 
        </BandAlbumsPageContainer>
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

export default BandAlbumsPage;