import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

export const usePrivatePage = () => {

  const history = useHistory();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('token');

    if (!accessToken) {
      history.push('/login');
    } 
  }, [history]);
};

export const usePublicPage = () => {

  const history = useHistory();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('token');

    if (accessToken) {
      history.push('/home');
    } 
  }, [history]);
};