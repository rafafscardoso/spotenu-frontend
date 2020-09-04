import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileContext } from '../contexts';
import { getProfile } from '../request';

export const useForm = (initialValues) => {

  const [form, setForm] = useState(initialValues);

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const resetForm = () => {
    setForm(initialValues);
  };

  return { form, onChange, resetForm };
};

export const usePrivatePage = () => {

  const history = useHistory();

  const { profile, setProfile } = useContext(ProfileContext);

  const getProf = async () => {
    try {
      const response = await getProfile();
      setProfile(response.user);
    } catch (error) {
      console.error(error.response);
    }
  }

  useEffect(() => {
    if (!profile) {
      getProf();
    }
    const token = window.localStorage.getItem('token');

    if (!token) {
      history.push('/login');
    } 
  }, [history]);
};

export const usePublicPage = () => {

  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      history.push('/home');
    } 
  }, [history]);
};