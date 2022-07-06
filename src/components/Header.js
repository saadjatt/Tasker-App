import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import SelectField from './FormFields';
import styles from '../styles/modules/app.module.scss';
import Modal from './Modal';
import { filterTodo } from '../reducers/todoReducer';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();
  const setFilter = (e) => {
    console.log(filterStatus);
    dispatch(filterTodo(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button onClick={() => setModalOpen(true)}>Click Me</Button>
      <SelectField value={filterStatus} onChange={setFilter}>
        <option value="all">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </SelectField>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default Header;
