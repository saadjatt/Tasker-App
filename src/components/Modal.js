import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo } from '../reducers/todoReducer';
import style from '../styles/modules/modal.module.scss';
import Button from './Button';

function Modal({ todo, type, modalOpen, setModalOpen }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending');

  const dispatch = useDispatch();
  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('Pending');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, status });

    if (title && status) {
      if (type === 'update' && todo) {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success('Task updated successfully');
        } else {
          toast.error('No changes for update.');
        }
      } else {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
      }

      setModalOpen(false);
    } else {
      toast.error('Please fill the required fields');
    }
  };

  return (
    modalOpen && (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div
            className={style.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={style.form} onSubmit={handleSubmit}>
            <h1 className={style.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </label>
            <Button type="submit" variant="primary">
              {type === 'update' ? 'Update' : 'Add'} Task
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
