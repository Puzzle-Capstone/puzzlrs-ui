import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import UserProfile from './UserProfile';
import PuzzleContainer from './PuzzleContainer';
import AddPuzzleForm from './AddPuzzleForm';
import '../css/App.css';
import { PuzzleProvider } from '../Context';

function App() {
  return (
    <PuzzleProvider>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' element={
            <div className='flex'>
              <Home />
            </div>
          } />
          <Route path='/user-profile' element={
            <UserProfile />
          } />
          <Route path='/puzzles' element={
            <PuzzleContainer />
          } />
          <Route path='/add-puzzle' element={
            <AddPuzzleForm />
          } />
        </Routes>
      </div>
    </PuzzleProvider>
  );
}

export default App;
