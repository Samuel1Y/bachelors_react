import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './Components/Header';

function App() {
  return (
    <div className="App"
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:'100%',
      width:'100%',
      overflow:'hidden'
    }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;