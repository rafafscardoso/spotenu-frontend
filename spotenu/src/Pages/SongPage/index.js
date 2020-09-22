import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import { usePrivatePage, useForm } from '../../hooks';
import { AlbumContext } from '../../contexts';
import { getSongById, editSong, deleteSong } from '../../request';
import { EditIcon, CancelIcon, MenuIcon, DeleteIcon } from '../../icons';
import {
  PageContainer,
  FormFormControl,
  FormTextField,
  FormButton,
  FormInputAdornment,
  FormIconButton,
  FormMenuItem,
  PageMenu,
  PageListItemIcon,
  PageListItemText,
  PageDialog,
  PageDialogContent,
  PageDialogContentText,
  PageDialogActions
} from '../../style';

import {
  SongPageContainer,
  EditSongWrapper,
  SongDetailWrapper
} from './style';

const SongPage = () => {

  usePrivatePage();
  
  const { albums } = useContext(AlbumContext);

  const history = useHistory();

  const pathParams = useParams();

  const { form, onChange, resetForm } = useForm({
    name: '',
    albumId: ''
  });

  const [song, setSong] = useState(undefined);
  const [update, setUpdate] = useState(false);
  const [showEditSong, setShowEditSong] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getSong();
  }, [setSong, update]);

  const getSong = async () => {
    try {
      const response = await getSongById(pathParams.songId);
      setSong(response.song);
    } catch (error) {
      console.error(error.response);
      if (error.response.data.message === 'Not accessible for admin') {
        setMessage('Não é acessível para administrador');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Only accessible for the creator band') {
        setMessage('Acessível apenas pelo artista criador');
        setShowMessage(true);
      }
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const submitEditSong = async (event) => {
    event.preventDefault();
    const body = form;
    try {
      await editSong(pathParams.songId, body);
      setUpdate(!update);
      setShowEditSong(false);
      setAnchorEl(null);
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para artista');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Álbum não encontrado');
        setShowMessage(true);
      }
      if (error.response.data.message === 'Album was not created by this band') {
        setMessage('Álbum não foi criado pela banda');
        setShowMessage(true);
      }
    }
  }

  const submitDeleteSong = async (songId) => {
    try {
      await deleteSong(songId);
      history.goBack();
    } catch (error) {
      console.error(error.response);
      if (error.response.status === 401) {
        setMessage('Acessível apenas para o artista criador');
        setShowMessage(true);
      }
      if (error.response.status === 404) {
        setMessage('Álbum não encontrado');
        setShowMessage(true);
      }
    }
  }

  const clickEditButton = () => {
    setShowEditSong(true);
    onChange('name', song.name);
  }

  const clickCancelButton = () => {
    setShowEditSong(false);
    setAnchorEl(null);
    resetForm();
  }

  return (
    <PageContainer>
      <Header />
      {song ? (
        <SongPageContainer>
          {showEditSong ? (
            <form onSubmit={submitEditSong} >
              <FormFormControl>
                <FormTextField 
                  name='name'
                  value={form.name}
                  label='Novo nome da música'
                  type='text'
                  onChange={handleInputChange}
                  variant='outlined'
                  color='primary'
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <FormInputAdornment>
                        {form.name &&
                          <FormIconButton onClick={resetForm}>
                            <CancelIcon />
                          </FormIconButton>
                        }
                      </FormInputAdornment>
                    )
                  }}
                />
              </FormFormControl>
              <FormFormControl>
                <FormTextField
                  select
                  name='albumId'
                  value={form.albumId}
                  label='Selecione o novo álbum para a música'
                  onChange={handleInputChange}
                  variant='outlined'
                  color='primary'
                >
                  <FormMenuItem value='' />
                  {albums.map((item) => {
                    const { id, name } = item;
                    return <FormMenuItem key={id} value={id} >{name}</FormMenuItem>
                  })}
                </FormTextField>
              </FormFormControl>
              <FormButton
                onClick={clickCancelButton}
                variant='outlined'
                color='secondary'
              >
                Cancelar
              </FormButton>
              <FormButton
                type='submit'
                variant='contained'
                color='primary'
              >
                Salvar
              </FormButton>
            </form>
          ) : (
            <EditSongWrapper>
              <SongDetailWrapper>
                <h3>Nome: {song.name}</h3>
                <h4>Álbum: {song.albumName}</h4>
                <p>Artista: {song.creatorBandName}</p>
              </SongDetailWrapper>
              <FormIconButton onClick={(e) => setAnchorEl(e.currentTarget)} >
                <MenuIcon />
              </FormIconButton>
              <PageMenu
                anchorEl={anchorEl}
                open={anchorEl ? true : false}
                onClose={() => setAnchorEl(null)}
              >
                <FormMenuItem button onClick={clickEditButton} >
                  <PageListItemIcon>
                    <EditIcon />
                  </PageListItemIcon>
                  <PageListItemText primary='Editar' />
                </FormMenuItem>
                <FormMenuItem button onClick={() => submitDeleteSong(song.id)} >
                  <PageListItemIcon>
                    <DeleteIcon />
                  </PageListItemIcon>
                  <PageListItemText primary='Deletar' />
                </FormMenuItem>
              </PageMenu>
            </EditSongWrapper>
          )}
        </SongPageContainer>
      ) : <Loading />}
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

export default SongPage;