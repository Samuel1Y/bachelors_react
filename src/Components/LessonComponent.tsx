import React from 'react'

import { CodeBlock, Description, Lesson, LessonPlan, LessonPlanProps, Title } from './Types'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { DefaultButton } from './DefaultButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { shareLessonAPI } from '../Redux/Thunks/lessonThunk'

export const LessonComponent: React.FC<LessonPlanProps> = ({
  title,
  sx,
}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate() //use for navigation
  const { pathname } = useLocation()
  const currentLessonPlan = useAppSelector((state) => state.lessonPlan.currentLessonPlan)
  const status = useAppSelector((state) => state.lessonPlanList.status)



  const handleClick = () => {
    // dispatch(shareLessonPlanAPI(titleInput))
    const lessonPlanTitle = pathname.split('/')[1]
    navigate('/'+lessonPlanTitle+'/'+title)
  }

  const handleRemove = () => {
    // dispatch(shareLessonPlanAPI(titleInput))
    console.log(title)
  }

  const handleShare = () => {
    if (title && currentLessonPlan) {
      const lesson = currentLessonPlan.lessons.find((lesson: Lesson) => lesson.title === title)
      if(lesson)
      {
        dispatch(shareLessonAPI(lesson))
        console.log('Shared Lesson: '+ lesson.title)
      }
    }
  }

return (
  <div
  onClick={() => handleClick()}
  style={{
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'0.5rem',
    width:'-webkit-fill-available',
    height:'10rem',
    border:'2px solid lightgray',
    borderRadius: '8px',
  }}
  >
    <Typography
    sx={{
        fontSize: '1.5rem',
        lineHeight: '2',  
        color: 'black',
        paddingX:'0.3rem',
        backgroundColor: 'whitesmoke',
        ...sx
      }}
  >
    {title}
    </Typography>
  <Box
    sx={{
      display:'flex',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',

    }}>
  <DefaultButton label='Share' 
    disabled={status !== 'idle'}
    onClick={(e) => {
      e.stopPropagation(); // Prevent the click event from reaching the parent div
      handleShare();
    }}
        sx={{
        display:'flex',
        flex:1,
        minWidth:'unset',
        width:'auto',
        height:'2rem',
        fontSize: '1rem',
        marginX:'1rem',
        backgroundColor:'gold',
        ':hover': {
          backgroundColor:'gold',
          opacity:'.7'
        },
        '&.Mui-disabled': {
          opacity:'.4',
        },
    }} />
  <DefaultButton label='Remove' 
    onClick={(e) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent div
    handleRemove();}}
        sx={{
          display:'flex',
          flex:1,
        minWidth:'unset',
        height:'2rem',
        fontSize: '1rem',
        marginX:'1rem',
        backgroundColor:'red',
        ':hover': {
          backgroundColor:'darkRed',
        },
        '&.Mui-disabled': {
          opacity:'.4',
        },
    }} />
    </Box>
  </div>
)}
