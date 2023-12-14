import React from 'react'

import { LessonPlanProps } from './Types'
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../Redux/hooks'
import { DefaultButton } from './DefaultButton'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeLessonPlan } from '../Redux/Reducers/LessonPlanListSlice'

const LessonPlanComponent: React.FC<LessonPlanProps> = ({
  title,
  sx,
}) => {

  const navigate = useNavigate() //use for navigation
  const dispatch = useAppDispatch()

  const handleClick = () => {
    navigate('/'+title)
  }

  const handleRemove = () => {
    dispatch(removeLessonPlan(title))
    console.log('removed Lesson Plan: '+ title)
  }

return (
  <div
  onClick={() => handleClick()}
  style={{
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'0.5rem',
    width:'-webkit-fill-available',
    height:'2rem',
    minWidth:'27rem',
    border:'2px solid lightgray',
    borderRadius: '8px',
  }}
  >
    <Typography
    sx={{
        fontSize: '1.5rem',
        lineHeight: '2',  
        color: 'black',
        ...sx
      }}
  >
    {title}
  </Typography>
  {title !== 'Saved Lessons' && <DefaultButton label='Remove' 
onClick={(e) => {
  e.stopPropagation(); // Prevent the click event from reaching the parent div
  handleRemove();}}
        sx={{
        width:'1rem',
        height:'1.5rem',
        fontSize: '0.5rem',
        marginX:'1rem',
        backgroundColor:'red',
        ':hover': {
          backgroundColor:'darkRed',
        },
        '&.Mui-disabled': {
          opacity:'.4',
        },
    }} />}
  </div>
)}
export default connect(null, { removeLessonPlan })(LessonPlanComponent)