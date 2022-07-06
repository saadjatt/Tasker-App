import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';
import style from '../styles/modules/app.module.scss';

function TaskList() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];

  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  const filterTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div className={style.content__wrapper}>
      {filterTodoList && filterTodoList.length > 0
        ? filterTodoList.map((todo) => <ListItem todo={todo} key={todo.id} />)
        : 'No item found... '}
    </div>
  );
}

export default TaskList;
