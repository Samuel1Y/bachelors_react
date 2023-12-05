import { Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../Components/DefaultButton';
import { Subtitle, Title } from '../Components/Text';
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux';
import { selectLessonPlan, LessonPlanState  } from '../Redux/Reducers/lessonPlanSlice';
import { addLessonPlan, setLessonPlanList } from '../Redux/Reducers/LessonPlanListSlice';
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
    const lessonPlanStatus = useAppSelector((state) => state.lessonPlan.status)
    const lessonPlanList = useAppSelector((state) => state.lessonPlanList.lessonPlans)
    const dispatch = useAppDispatch()

    const generateCode = (length: number) => {
        let code = ''
        /* generating random code
        for (let index = 0; index < length; index++) {
            code += Math.floor(Math.random() * (9 - 0 + 1)); //random number from 0-9

        }
        */
        console.log(code)
        setGeneratedCode(code)
        return code
    }

    const handleRedeem = async () => {
        dispatch(getLessonAPI(codeInput));    
    }

    const handleCreate = (titleInput:string) => {
        navigate('/lessonPage')
    }

    const handleCreateLessonPlan = (LessonPlanTitleInput:string) => {
        dispatch(addLessonPlan(LessonPlanTitleInput))
        //setLessonPlanTitleInput('')
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
    </Box>
    )
}

export default connect(null, { addLessonPlan })(Home)