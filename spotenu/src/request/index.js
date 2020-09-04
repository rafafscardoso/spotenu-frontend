import axios from 'axios';

// const baseUrl = 'https://5d4u5nhjxd.execute-api.us-east-1.amazonaws.com/dev';

const baseUrl = 'http://localhost:3003'

export const signUp = async (body) => {
  const response = await axios.post(`${baseUrl}/user/signup`, body);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  return response.data;
}

export const createAdmin = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/user/admin/create`, body, { headers });
  return response.data;
}

export const createBand = async (body) => {
  const response = await axios.pu(`${baseUrl}/user/band/create`, body);
  return response.data;
}

export const login = async (body) => {
  const response = await axios.post(`${baseUrl}/user/login`, body);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  return response.data;
}

export const getAllBands = async () => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/user/band/all`, { headers });
  return response.data;
}

export const approveBand = async (bandId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  console.log(headers.authorization)
  const response = await axios.put(`${baseUrl}/user/approve/${bandId}`, {}, { headers });
  return response.data;
}

export const createMusicGenre = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/genre/create`, body, { headers });
  return response.data;
}

export const getAllMusicGenres = async () => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/genre/all`, { headers });
  return response.data;
}

export const createAlbum = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/album/create`, body, { headers });
  return response.data;
}

export const createSong = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/song/create`, body, { headers });
  return response.data;
}

export const getAlbumById = async (albumId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/album/${albumId}`, { headers });
  return response.data;
}

export const getSongsByQuery = async (query, page) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/song/query?query=${query}&page=${page}`, { headers });
  return response.data;
}

export const getSongById = async (songId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/song/${songId}`, { headers });
  return response.data;
}

export const upgradeToPremium = async (userId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/user/upgrade/${userId}`, {}, { headers });
  return response.data;
}

export const createPlaylist = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/playlist/create`, body, { headers });
  return response.data;
}

export const addSongToPlaylist = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/playlist/song`, body, { headers });
  return response.data;
}

export const removeSongFromPlaylist = async (id, songId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.delete(`${baseUrl}/music/playlist/${id}/song/${songId}`, { headers });
  return response.data;
}

export const getAllPlaylistsByUser = async (page) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/playlist/all?page=${page}`, { headers });
  return response.data;
}

export const getAllPublicPlaylists = async (page) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/playlist/public?page=${page}`, { headers });
  return response.data;
}

export const publishPlaylist = async (playlistId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/playlist/publish/${playlistId}`, {}, { headers });
  return response.data;
}

export const followPlaylist = async (playlistId) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.pu(`${baseUrl}/music/playlist/follow/${playlistId}`, {}, { headers });
  return response.data;
}

export const getPlaylistById = async (playlistId, page) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/playlist/${playlistId}?page=${page}`, { headers });
  return response.data;
}

export const editProfile = async (body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/user/edit`, body, { headers });
  return response.data;
}

export const editPlaylist = async (playlistId, body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/playlist/edit/${playlistId}`, body, { headers });
  return response.data;
}

export const editSong = async (songId, body) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.put(`${baseUrl}/music/song/edit/${songId}`, body, { headers });
  return response.data;
}

export const getProfile = async () => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/user/profile`, { headers });
  return response.data;
}

export const getAlbumsByBand = async () => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/album/band/all`, { headers });
  return response.data;
}

export const getAllListeners = async () => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/user/listeners/all`, { headers });
  return response.data;
}

export const getSongsByMusicGenre = async (genreId, page) => {
  const authorization = window.localStorage.getItem('token');
  const headers = { authorization };
  const response = await axios.get(`${baseUrl}/music/song/genre/${genreId}?page=${page}`, { headers });
  return response.data;
}