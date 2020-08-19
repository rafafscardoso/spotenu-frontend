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
    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
      history.push('/login');
    } 
  }, [history]);
};

export const usePublicPage = () => {

  const history = useHistory();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      history.push('/home');
    } 
  }, [history]);
};

export const useGenerateAvatar = () => {

  const baseUrl = 'https://api.adorable.io/avatars/face';

  const eyes = ['eyes1', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes8', 'eyes9', 'eyes10'];

  const noses = ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'];

  const mouths = ['mouth1', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9', 'mouth10', 'mouth11'];

  const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  const eye = eyes[Math.floor(Math.random() * eyes.length)];

  const nose = noses[Math.floor(Math.random() * noses.length)];

  const mouth = mouths[Math.floor(Math.random() * mouths.length)];

  let color = '';

  for (let i = 0; i < 6; i++) {
    color += colors[Math.floor(Math.random() * colors.length)];
  }

  return `${baseUrl}/${eye}/${nose}/${mouth}/${color}`;
}