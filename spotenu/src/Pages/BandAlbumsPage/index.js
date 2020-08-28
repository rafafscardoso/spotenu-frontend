import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import { getAlbumsByBand } from '../../request';
import {
  PageContainer,
  PageList,
  PageListItem,
  PageListItemText,
  PageListItemIcon,
  PageDivider
} from '../../style';

import {
  BandAlbumsPageContainer,
  AddIcon
} from './style';

const BandAlbumsPage = () => {

  const { setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  const history = useHistory();

  const [albums, setAlbums] = useState(undefined);

  useEffect(() => {
    getAlbumsByBand()
      .then(response => {
        setAlbums(response.albums);
      })
      .catch(error => {
        console.error(error.response);
      });
  }, [setAlbums]);

  return (
    <PageContainer>
      <Header />
      <BandAlbumsPageContainer>
        {albums ? 
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
                </PageListItem>
              )
            })}
          </PageList> 
        : <></>}
      </BandAlbumsPageContainer>
      <Footer />
    </PageContainer>
  );
};

export default BandAlbumsPage;