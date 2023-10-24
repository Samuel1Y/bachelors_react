import { Box, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../Components/DefaultButton';
import { Subtitle } from '../Components/Text';
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux';
import { getLessonPlan } from '../Redux/Reducers/lessonPlansSlice';


function Home() {


    const [codeInput, setCodeInput] = React.useState('')
    const [generatedCode, setGeneratedCode] = React.useState('')

    const navigate = useNavigate() //use for navigation
    const lessonPlan = useAppSelector((state) => state.lessonPlans)
    const dispatch = useAppDispatch()

    const generateCode = (length: number) => {
        let code = ''
        for (let index = 0; index < length; index++) {
            code += Math.floor(Math.random() * (9 - 0 + 1)); //random number from 0-9

        }
        console.log(code)
        setGeneratedCode(code)
        return code
    }

    const handleRedeem = () => {
        dispatch(getLessonPlan(codeInput))
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
            <DefaultButton label='create' onClick={() => generateCode(5)} />
            <Subtitle text={generatedCode}
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
            <Subtitle text={lessonPlan.code}
                sx={{
                    minHeight: '5rem'
                }}
            /><Subtitle text={lessonPlan.title}
                sx={{
                    minHeight: '5rem'
                }}
            />
        </Box>
    )
}

export default connect(null, { getLessonPlan })(Home)