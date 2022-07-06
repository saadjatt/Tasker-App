import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../reducers/todoReducer';
import style from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { CheckBox } from './FormFields';
import Modal from './Modal';

function ListItem({ todo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === 'Completed') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log('Delete');
    dispatch(deleteTodo(todo.id));
    toast.success('Task deleted successfully');
  };
  const handleUpdate = () => {
    setModalOpen(true);
    console.log('Update');
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'Pending' : 'Completed' })
    );
  };
  return (
    <div className={style.item}>
      <div className={style.todoDetails}>
        <CheckBox checked={checked} handleCheck={handleCheck} />
        <div className={style.texts}>
          <p
            className={getClasses([
              style.todoText,
              todo.status === 'Completed' && style['todoText--completed'],
            ])}
          >
            {todo.title}
          </p>
          <p className={style.time}>
            {format(new Date(todo.time), 'p , MM/dd/Y ')}
          </p>
        </div>
      </div>
      <div className={style.todoActions}>
        <div
          className={style.icon}
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          <MdDelete />
        </div>
        <div
          className={style.icon}
          onClick={handleUpdate}
          onKeyDown={handleUpdate}
          role="button"
          tabIndex={0}
        >
          <MdEdit />
        </div>
      </div>
      <Modal
        todo={todo}
        type="update"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default ListItem;
