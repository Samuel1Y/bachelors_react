import React from 'react'
import {
  Route, Routes
} from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import LessonPage from './Pages/LessonPage'
import LessonPlanView from './Pages/LessonPlanView'

export default function RootRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
      <Route element={<Home />} index />
      <Route path=":lessonPlanTitle">
          <Route element={<LessonPlanView />} index />
          <Route element={<LessonPage />} path=":lessonTitle" />
      </Route>
        {/*
        <Route element={<Welcome />} index />
        <Route element={<Home />} path='home' />
        */}
      </Route>
    </Routes>
  )
}
