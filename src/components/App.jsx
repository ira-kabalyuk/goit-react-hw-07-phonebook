import React from 'react';

import { Container } from './Container';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';

const App = () => {
  
  return (
    <Container>
      <ContactForm/>
      <Filter/>
      <ContactList/>
    </Container>
  );
};


export { App };