import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteContact, apiGetContacts } from '../../redux/contacts/contactsReducer';
import { STATUSES } from 'utils/constants';
import { Loader } from 'components/Loader';
import { Error } from 'components/Error';

import styles from './ContactList.module.scss';

const ContactList = () => {

  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const status = useSelector(state => state.contacts.contacts.status);
  const error = useSelector(state => state.contacts.contacts.error);
  const loading = useSelector(state => state.contacts.contacts.isLoading);

   useEffect(() => {
     dispatch(apiGetContacts())
   }, [dispatch])
  
 
  const onDeleteContact = (contactId) => {
    dispatch(apiDeleteContact(contactId));    
  }
  
 
  const getVisisbleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const visibleContacts = getVisisbleContacts();

  const showContacts = status === STATUSES.success;
  const showError = status === STATUSES.error;
  const showLoader = status === STATUSES.pending;

  return (
    <div>
      {showLoader && <Loader />}
      {showError && <Error>Oops, some error occurred... {error}</Error>}

      {visibleContacts.length > 0 && showContacts && (
        <ul className={styles.list}>
          {visibleContacts.map(({ id, name, phone }) => (
            <li className={styles.item} key={id + phone}>
              <span>{name}</span>
              <span>{phone}</span>
              <button type='button' className={styles.button} onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { ContactList };
