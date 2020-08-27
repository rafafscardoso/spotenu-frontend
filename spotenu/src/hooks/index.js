import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getProfile } from '../request';

export const useForm = (InitialValues) => {

  const [form, setForm] = useState(InitialValues);

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const resetForm = () => {
    setForm(InitialValues);
  };

  return { form, onChange, resetForm };
};

export const usePrivatePage = (setProfile) => {

  const history = useHistory();

  useEffect(() => {
    getProfile()
      .then(response => {
        setProfile(response);
      })
      .catch(error => {
        console.error(error.response);
      });
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