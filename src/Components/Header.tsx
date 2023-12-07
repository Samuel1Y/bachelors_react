import React, { useEffect } from 'react'

import { HeaderProps } from './Types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@mui/material'
import { Subtitle, Title } from './Text'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { setLastSharedLessonSharingTime } from '../Redux/Reducers/LessonPlanListSlice'
import { connect } from 'react-redux'
import { logOut } from '../Redux/Reducers/TeacherSlice'
import { loginTeacherAPI } from '../Redux/Thunks/TeacherThunk'

const Header: React.FC<HeaderProps> = ({
}) => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const lastSharedLessonCode = useAppSelector((state) => state.lessonPlanList.lastSharedLessonCode)
    const lastSharedLessonTitle = useAppSelector((state) => state.lessonPlanList.lastSharedLessonTitle)
    const lastSharedLessonSharingTime = useAppSelector((state) => state.lessonPlanList.lastSharedLessonSharingTime)
    const isLoggedIn = useAppSelector((state) => state.teacher.isLoggedIn)
    const loggedTeacher = useAppSelector((state) => state.teacher.teacher)

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

      
      const handleLogin = async () => {
          const args = {
              username: username,
              password: password,
            }
            await dispatch(loginTeacherAPI(args))
            handleClose()
        }
        
        const handleLogOut = () => {
            dispatch(logOut())
        }
        
    // pop up
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
    <Box
    className="Header"
    sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',        
        maxHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#282a32',
     }}>
        <Box
        sx={{
            display:'flex',
            width:'10rem'
        }}>  
        </Box>
        <Title text='LEGO   '/>
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            width:'10rem',
            alignItems:'center',
            justifyContent: 'center',
        }}>
            {isLoggedIn && loggedTeacher ? <Typography
            sx={{
                color:'white',
                cursor:'pointer',
            }}>
                {'Logged in: '+ loggedTeacher.username}
            </Typography> :
            <Typography
            onClick={handleClickOpen}
            sx={{
                color:'white',
                textDecoration:'underline',
                textUnderlineOffset:'2px',
                cursor:'pointer',
            }}>
                Log in as teacher
            </Typography>} 
            {isLoggedIn && 
            <Typography
            onClick={handleLogOut}
            sx={{
                color:'red',
                textDecoration:'underline',
                textUnderlineOffset:'2px',
                cursor:'pointer',
            }}>
                Log out
            </Typography>}
        </Box>
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
        <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle id="alert-dialog-title">
          {`Log In`}
        </DialogTitle>
        <DialogContent>
        <FormControl>
        <TextField
            label='Username'
            type='text'
            variant='standard'
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            sx={{
                marginY:'2rem',
                margin:'1rem',
            }}/>
        <TextField
            label='Password'
            type='password'
            variant='standard'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            sx={{
                marginY:'2rem',
                margin:'1rem',
            }}/>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin} autoFocus>Log in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </Box>
)}

export default connect(null, { logOut })(Header)