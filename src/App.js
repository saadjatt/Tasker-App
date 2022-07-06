import React from 'react';
import { Toaster } from 'react-hot-toast';

import Title from './components/Title';
import './styles/GlobalStyles.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import style from './styles/modules/app.module.scss';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  return (
    <>
      <div className="container">
        <Title>TASKER APP</Title>
        <div className={style.app__wrapper}>
          <Header />
          <TaskList />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { fontSize: '1.4rem' } }}
      />
    </>
  );
}

export default App;
