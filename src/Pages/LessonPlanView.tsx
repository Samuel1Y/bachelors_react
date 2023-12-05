import { Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DefaultButton } from '../Components/DefaultButton';
import { Title } from '../Components/Text';
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux';
import { setCurrentLessonPlan } from '../Redux/Reducers/lessonPlanSlice';
import { addLesson, addLessonPlan } from '../Redux/Reducers/LessonPlanListSlice';
import { LessonPlan } from '../Components/Types';
import { LessonComponent } from '../Components/LessonComponent';


function LessonPlanView() {


    const [LessonTitleInput, setLessonTitleInput] = React.useState('')

    const navigate = useNavigate() //use for navigation
    const { pathname } = useLocation()
    const lessonPlanList = useAppSelector((state) => state.lessonPlanList.lessonPlans)
    const currentLessonPlan = useAppSelector((state) => state.lessonPlan.currentLessonPlan)

    const dispatch = useAppDispatch()

    const handleCreateLesson = (LessonTitleInput:string) => {
      const payload = {
        LessonPlanTitle: currentLessonPlan?.title,
        LessonTitle: LessonTitleInput
      }
      dispatch(addLesson(payload))
      setLessonTitleInput('')
    }

    useEffect(() => {
      if(pathname.split('/')[1] === 'Saved%20Lessons')
      {
          dispatch(setCurrentLessonPlan(lessonPlanList.find((lessonPlan: LessonPlan) => lessonPlan.title === 'Saved Lessons')))
      }
      else dispatch(setCurrentLessonPlan(lessonPlanList.find((lessonPlan: LessonPlan) => lessonPlan.title === pathname.split('/')[1])))
    }, [dispatch, lessonPlanList, pathname])


    return (
        <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1,
              paddingX: '1rem',
              maxHeight: '89vh',
              width:'100vw',
              overflow: 'auto'
          }}>
            <Title text={currentLessonPlan ? currentLessonPlan.title : ''}/>
            <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                flexDirection: 'column',
                gap: '1rem',
                alignItems:'center',
                justifyContent:'start',
                flex: 1,
                border:'2px solid purple',
                borderRadius:5,
                margin:'1rem',
                paddingX: '1rem',
                padding:'2rem',
                width:'auto',
                height: '100%',
                maxHeight: '89vh',
                overflow: 'auto'
            }}>
            {currentLessonPlan?.lessons?.map((lessonPlan, index) => (
              <LessonComponent key={index} title={lessonPlan.title}/>
              ))}
              
            <div
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
                  <TextField
                    label='Enter Title'
                    type='text'
                    variant='standard'
                    size='small'
                    value={LessonTitleInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLessonTitleInput(e.target.value)}
                    sx={{
                        height: '3rem',
                    }}
                  />
                <Box
                  sx={{
                    display:'flex',
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'center',

                  }}>
                <DefaultButton label='Add' 
                  onClick={(e) => {
                  e.stopPropagation() // Prevent the click event from reaching the parent div
                  handleCreateLesson(LessonTitleInput)
                  }}
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
    </Box>
    </Box>
    )
}

export default connect(null, { addLessonPlan, addLesson, setCurrentLessonPlan })(LessonPlanView)