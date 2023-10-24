import React from 'react'
import {
  Route, Routes
} from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'

export default function RootRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
      <Route element={<Home />} index />
        {/*
        <Route element={<Welcome />} index />
        <Route element={<Home />} path='home' />
        */}
      </Route>
    </Routes>
  )
}
