import React from 'react'
import {
  Route, Routes
} from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import LessonPage from './Pages/LessonPage'

export default function RootRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
      <Route element={<Home />} index />
      <Route element={<LessonPage />} path='/lessonPage' />

        {/*
        <Route element={<Welcome />} index />
        <Route element={<Home />} path='home' />
        */}
      </Route>
    </Routes>
  )
}
