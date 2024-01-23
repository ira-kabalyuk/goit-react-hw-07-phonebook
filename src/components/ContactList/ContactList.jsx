import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactList.module.scss';
import { removeContact } from '../../redux/contacts/contactsReducer';

const ContactList = () => {

  const dispatch = useDispatch();

  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);  

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

  const visibleContacts = getVisisbleContacts();

  return (
    <div>
      {contacts.length > 0 ? (
        <ul className={styles.list}>
          {visibleContacts.map(({ id, name, number }) => (
            <li className={styles.item} key={id}>
              <span>{name}</span>
              <span>{number}</span>
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
