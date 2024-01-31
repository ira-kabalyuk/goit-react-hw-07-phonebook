import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.scss';
import { setFilter } from '../../redux/contacts/contactsReducer';
import { selectContactsFilter } from '../../redux/contacts/contactsSlice.selectors';

  const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectContactsFilter);

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
