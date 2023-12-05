import React, { useEffect } from 'react'

import { HeaderProps } from './Types'
import { Box } from '@mui/material'
import { Subtitle, Title } from './Text'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { setLastSharedLessonSharingTime } from '../Redux/Reducers/LessonPlanListSlice'

export const Header: React.FC<HeaderProps> = ({
}) => {

    const lastSharedLessonCode = useAppSelector((state) => state.lessonPlanList.lastSharedLessonCode)
    const lastSharedLessonTitle = useAppSelector((state) => state.lessonPlanList.lastSharedLessonTitle)
    const lastSharedLessonSharingTime = useAppSelector((state) => state.lessonPlanList.lastSharedLessonSharingTime)
    const dispatch = useAppDispatch()

    const [count, setCount] = React.useState(lastSharedLessonSharingTime)


    useEffect(() => {
        const interval = setInterval(() => {
                setCount((prevCount) => prevCount - 1)
                dispatch(setLastSharedLessonSharingTime(count)) //keep updating SharingTime state
        }, 60000) // -1 each minute
        if (count === -1) { //stop interval when it reaches -1
            clearInterval(interval);
          }
      
          // Cleanup the interval when the component unmounts
          return () => clearInterval(interval);
      }, [count])

      useEffect(() => {
        if(lastSharedLessonSharingTime > 0)
        {
            setCount(lastSharedLessonSharingTime) //value in minutes
        }
      }, [lastSharedLessonSharingTime])

    return (
    <Box
    className="Header"
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',        
        maxHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#282a32',
     }}>
        <Title text='LEGO   '/>
        {(count >= 0) &&
        <Box
        sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width:'100%',
            backgroundColor: 'lime',
         }}>
            <Subtitle text={`Currently Sharing: ${lastSharedLessonTitle}`}/>
            <Subtitle text={`Code:${lastSharedLessonCode}`}/>
            <Subtitle text={`Time left(minutes):${count}`}/>
        </Box>}
    </Box>
)}