import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../Components/DefaultButton';
import { Subtitle, Title } from '../Components/Text';
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux';
import { selectLessonPlan, LessonPlanState  } from '../Redux/Reducers/lessonPlanSlice';
import { addLessonPlan, addRedeemedLesson, setLessonPlanList } from '../Redux/Reducers/LessonPlanListSlice';
import { LessonPlanComponent } from '../Components/LessonPlanComponent';
import { LessonPlan } from '../Components/Types';
import { getLessonAPI } from '../Redux/Thunks/lessonThunk';


function Home() {


    const [codeInput, setCodeInput] = React.useState('226492')
    const [titleInput, setTitleInput] = React.useState('')
    const [LessonPlanTitleInput, setLessonPlanTitleInput] = React.useState('')

    const [generatedCode, setGeneratedCode] = React.useState('')

    const navigate = useNavigate() //use for navigation
    const lessonPlan = useAppSelector((state) => state.lessonPlan)
    const lessonPlanListStatus = useAppSelector((state) => state.lessonPlanList.status)
    const lessonPlanList = useAppSelector((state) => state.lessonPlanList.lessonPlans)
    const redeemedLesson = useAppSelector((state) => state.lessonPlanList.lastRedeemedLesson)
    const dispatch = useAppDispatch()

    const handleRedeem = async () => {
        await dispatch(getLessonAPI(codeInput)) 
        handleClickOpen()  
    }

    const handleCreateLessonPlan = (LessonPlanTitleInput:string) => {
        dispatch(addLessonPlan(LessonPlanTitleInput))
        //setLessonPlanTitleInput('')
    }

    // pop up
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAddLesson = () => {
        dispatch(addRedeemedLesson(redeemedLesson))
        handleClose()
    }

    useEffect(() => {

    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                flex: 1,
                paddingX: '1rem',
                maxHeight: '89vh',
                width:'100vw',
                overflow: 'auto'
            }}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flex: 1,
                paddingX: '1rem',
                maxHeight: '89vh',
                minWidth:'auto',
                width:'24rem',
                overflow: 'auto'
            }}>
            <Title text='Enter Code' />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                }}
            >
                <TextField
                    label='Code'
                    type='text'
                    value={codeInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodeInput(e.target.value)}
                    sx={{
                        marginY: '0.5rem'
                    }}
                />
                <DefaultButton
                    label='redeem'
                    disabled={lessonPlanListStatus !== 'idle'}
                    onClick={handleRedeem}
                    sx={{
                        height: 'auto',
                        margin: 0,
                    }}
                />
            </Box>
        </Box>
            <Box
            sx={{
                display: 'flex',
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
                maxHeight: '89vh',
                overflow: 'auto'
            }}>
            {lessonPlanList?.map((lessonPlan: LessonPlan, index: number) => (
              <LessonPlanComponent key={index} title={lessonPlan.title}/>
              ))}
              
              <div
                style={{
                    display:'flex',
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    padding:'0.5rem',
                    width:'-webkit-fill-available',
                    height:'2rem',
                    border:'2px solid lightgray',
                    borderRadius: '8px',
                }}
                >
                <TextField
                    label='Enter Title'
                    type='text'
                    variant='standard'
                    size='small'
                    value={LessonPlanTitleInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLessonPlanTitleInput(e.target.value)}
                    sx={{
                        height: '3rem',
                    }}
                />
                <DefaultButton label='Add' 
                onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from reaching the parent div
                handleCreateLessonPlan(LessonPlanTitleInput);}}
                        sx={{
                        width:'1rem',
                        height:'1.5rem',
                        fontSize: '0.5rem',
                        marginX:'1rem',
                        backgroundColor:'green',
                        ':hover': {
                        backgroundColor:'darkGreen',
                        },
                        '&.Mui-disabled': {
                        opacity:'.4',
                        },
                    }} />
            </div>
    </Box>
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {redeemedLesson ? <>
            <DialogTitle id="alert-dialog-title">
          {`${redeemedLesson.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you wish to add this lesson in your saved lessons?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddLesson} autoFocus>Add Lesson</Button>
        </DialogActions>
        </> : <>
        <DialogTitle id="alert-dialog-title">
          {`No lesson found`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Redeemed access code is wrong or expired`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </>}
        
      </Dialog>
    </React.Fragment>
    </Box>
    
    )
}

export default connect(null, { addLessonPlan, addRedeemedLesson })(Home)