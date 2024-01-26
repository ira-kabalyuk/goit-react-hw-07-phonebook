import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetContacts } from '../redux/contacts/contactsReducer';

import { Container } from './Container';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { Loader } from './Loader';


const App = () => {

  //const dispatch = useDispatch();
  const error = useSelector(state => state.contacts.contacts.error);
  const loading = useSelector(state => state.contacts.contacts.isLoading);

  // useEffect(() => {
  //   dispatch(apiGetContacts())
  // }, [dispatch])
  
  return (
    <Container>
      <ContactForm/>
      <Filter />
      {loading && !error && <Loader />}
      <ContactList/>
    </Container>
  );
};


export { App };