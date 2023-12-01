import { Box, TextField } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux'
import { getLessonPlan, getLessonPlanAPI, shareLessonPlanAPI } from '../Redux/Reducers/lessonPlansSlice'
import { LessonPageComponent } from '../Components/LessonPageComponent'
import { DefaultButton } from '../Components/DefaultButton'
import { TitleComponent } from '../Components/TitleComponent'
import { addLessonPlan } from '../Redux/Reducers/LessonPlanListSlice'


function LessonPage() {

    const navigate = useNavigate() //use for navigation
    const lessonPlan = useAppSelector((state) => state.lessonPlans)
    const dispatch = useAppDispatch()

    const eventHandler = (e:any, data:any) => {
      console.log('Event Type', e.type);
      console.log({e, data});
    }

    const handleDone = () => {
        dispatch(shareLessonPlanAPI(lessonPlan.title)) //title here
        dispatch(addLessonPlan(lessonPlan))
        navigate('/')
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 7fr',
                paddingX: '1rem',
                height:'88.2vh',
                width:'100vw',
                overflow: 'hidden'
            }}>

        <Box
        className='SideBar'
            sx={{
                display: 'flex',
                flex:1,
                height:'auto',
                width:'auto',
                overflow: 'hidden'
            }}>
            <DefaultButton label='done' onClick={() => handleDone()} />
        </Box>

        <Box
        className='MainContent'
            sx={{
                display: 'flex',
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                height:'auto',
                width:'auto',
                overflow: 'hidden',
                bgcolor:'lightgray'
            }}>
          <LessonPageComponent 
          components={[<TitleComponent text={lessonPlan.title} />, <TitleComponent text={"ja neviem"} />, <div></div>, <div></div>,<div></div>]} />
        </Box>

      </Box>

    )
}

export default connect(null, { getLessonPlan, getLessonPlanAPI, shareLessonPlanAPI, addLessonPlan })(LessonPage)