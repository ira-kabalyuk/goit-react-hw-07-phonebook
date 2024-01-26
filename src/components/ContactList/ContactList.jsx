import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetContacts, removeContact } from '../../redux/contacts/contactsReducer';
import styles from './ContactList.module.scss';
import { STATUSES } from 'utils/constants';
import { Loader } from 'components/Loader';
import { Error } from 'components/Error';

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

   const onDeleteContact = contactId => {
    
    const action = removeContact(contactId)
    dispatch(action);
   }
  
  const getVisisbleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const visibleContacts = getVisisbleContacts() || [];

  const showContacts = status === STATUSES.success;
  const showError = status === STATUSES.error;
  const showLoader = status === STATUSES.pending;

  return (
    <div>
      {showLoader && <Loader /> && <p className={styles.message}>{loading}</p>}
      {showError && <Error>Oops, some error occurred... {error}</Error>}

      {(contacts.length > 0 && showContacts && <Loader />) &&
        <ul className={styles.list}>
          {visibleContacts.map(({ id, name, phone }) => (
            <li className={styles.item} key={id+phone}>
              <span>{name}</span>
              <span>{phone}</span>
              <button className={styles.button} onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export { ContactList };
