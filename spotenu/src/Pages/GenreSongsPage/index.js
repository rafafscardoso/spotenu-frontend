import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage } from '../../hooks';
import { BrowseContext } from '../../contexts';
import { getSongsByMusicGenre } from '../../request';
import { ArrowFwdIcon } from '../../icons';
import {
  PageContainer,
  PageList,
  PageListItem,
  PageListItemText,
  PagePagination
} from '../../style';

import {
  GenreSongsPageContainer,
  QueryResultWrapper
} from './style';

const GenreSongsPage = () => {

  usePrivatePage();

  const history = useHistory();

  const pathParams = useParams();

  const { browseSongs, setBrowseSongs, browseCount, setBrowseCount, browsePage, setBrowsePage } = useContext(BrowseContext);

  useEffect(() => {
    getSongs(browsePage);
  }, [setBrowseCount, setBrowseSongs, pathParams, browsePage]);

  const getSongs = async (page) => {
    try {
      const response = await getSongsByMusicGenre(pathParams.genreId, page);
      setBrowseCount(Math.ceil(response.quantity / 10));
      setBrowseSongs(response.songs);
    } catch (error) {
      console.error(error.response);
    }
  }

  const handleChange = (event, value) => {
    setBrowsePage(value);
    setBrowseSongs(undefined);
    getSongs(value);
  }

  return (
    <PageContainer>
      <Header />
      {browseSongs ? 
        <GenreSongsPageContainer>
          {browseSongs.length ? (
            <QueryResultWrapper>
              <PageList>
                {browseSongs.map((item) => {
                  const { id, name } = item;
                  return (
                    <PageListItem key={id} onClick={() => history.push(`/song/${id}`)} >
                      <PageListItemText primary={name} />
                      <ArrowFwdIcon color='primary' />
                    </PageListItem>
                  )
                })}
              </PageList>
              {browseCount && 
                <PagePagination 
                  count={browseCount} 
                  page={browsePage} 
                  onChange={handleChange} 
                />
              }
            </QueryResultWrapper>
          ) : (
            <div>{'Não encontramos nada :('}</div>
          )}
        </GenreSongsPageContainer> 
      : <Loading />}
      <Footer />
    </PageContainer>
  )
};

export default GenreSongsPage;