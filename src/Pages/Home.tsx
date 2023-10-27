import { Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../Components/DefaultButton';
import { Subtitle } from '../Components/Text';
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux';
import { getLessonPlan, getLessonPlanAPI, shareLessonPlanAPI } from '../Redux/Reducers/lessonPlansSlice';


function Home() {


    const [codeInput, setCodeInput] = React.useState('226492')
    const [titleInput, setTitleInput] = React.useState('')

    const [generatedCode, setGeneratedCode] = React.useState('')

    const navigate = useNavigate() //use for navigation
    const lessonPlan = useAppSelector((state) => state.lessonPlans)
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

    const handleRedeem = () => {
        //dispatch(getLessonPlan(codeInput))
        dispatch(getLessonPlanAPI(codeInput))
    }

    const handleCreate = () => {
        dispatch(shareLessonPlanAPI(titleInput))
    }


    useEffect(() => {

    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flex: 1,
                paddingX: '1rem',
                maxHeight: '89vh',
                overflow: 'auto'
            }}>
            <TextField
                label='Title'
                type='text'
                value={titleInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
                sx={{
                    marginY: '0.5rem'
                }}
            />
            <DefaultButton label='create' onClick={() => handleCreate()} />
            <Subtitle text={'Generated Access Code: '+ lessonPlan.code}
                sx={{
                    minHeight: '5rem'
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
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
                        height: 'auto'
                    }}
                />
            </Box>
            <Subtitle text={'Retrieved Title: '+lessonPlan.title}
                sx={{
                    minHeight: '5rem'
                }}
            />
        </Box>
    )
}

export default connect(null, { getLessonPlan, getLessonPlanAPI, shareLessonPlanAPI })(Home)