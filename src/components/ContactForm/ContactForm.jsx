import React, { useState } from 'react';
import shortid from 'shortid';
import styles from './ContactForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsReducer';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector((store) => store.contacts.contacts);

    const createContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts?.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
    ))
    {
      return alert(`${name} is already in phonebook`);
    }

    const action = addContact(contact);
    dispatch(action);
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    }

    if (name === 'number')
      setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    createContact(name, number);
    reset();
  }
  
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">add Contact</button>
      </form>
    </>
  );
};


export { ContactForm };

