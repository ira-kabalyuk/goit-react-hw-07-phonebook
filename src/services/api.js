import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://65afd1072f26c3f2139bd1a3.mockapi.io',
})


export const requestContacts = async () => {
  const { data } = await instance.get(`/contacts/contacts`)
  return data;
};

export const addContactRequest = async (name, phone) => {
  const postData = {
    name, 
    phone,
  };
  
  const { data } = await instance.post('/contacts/contacts', postData);
  return data;
};

