import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskPage from './components/TaskPage';

const App = () => {

  return (
    <div>
      <header className='header-inner'>
      </header>
      <main className='main'>
        <Router>
          <Routes>
            <Route exact path='/task' element={<TaskPage />} />
          </Routes>
        </Router>
      </main>
      <footer className='footer'></footer>
    </div>
  );
}

export default App;
