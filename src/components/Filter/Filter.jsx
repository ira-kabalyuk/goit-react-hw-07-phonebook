import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.scss';
import { setFilter } from '../../redux/contacts/contactsReducer';

  const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(store => store.contacts.filter);

   const changeFilter = event => {

    const action = setFilter(event.currentTarget.value);
    dispatch(action);
  }

    return (
    <>
      <h2>Contacts</h2>
      <label className={styles.label}>
        Filter
        <input type="text" value={filter} onChange={changeFilter} />
      </label>
    </>
  );
};


export { Filter };
