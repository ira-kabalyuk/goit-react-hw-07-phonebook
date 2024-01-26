import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetContacts, removeContact } from '../../redux/contacts/contactsReducer';
import styles from './ContactList.module.scss';
import { STATUSES } from 'utils/constants';
import { Loader } from 'components/Loader';

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
    
    // return contacts?.filter(contact =>
    //   contact.name.toLowerCase().includes(normalizedFilter)
    // );
  }

  const visibleContacts = getVisisbleContacts() || [];


  return (
    <div>
      {status === STATUSES.pending && <p className={styles.message}>{loading}</p>}
      {status === STATUSES.error && <p className={styles.message}>{error}</p>}
      {contacts.length > 0 ? (
        <ul className={styles.list}>
          {visibleContacts.map(({ id, name, phone }) => (
            <li className={styles.item} key={id}>
              <span>{name}</span>
              <span>{phone}</span>
              <button className={styles.button} onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>contact not found &#129335;</p>
      )}
    </div>
  );
};

export { ContactList };
