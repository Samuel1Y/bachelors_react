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
import DescriptionComponent from '../Components/DescriptionComponent'
import { DefaultText, Subtitle, Title } from '../Components/Text'


function LessonPage() {

    
    const navigate = useNavigate() //use for navigation
    const lessonPlan = useAppSelector((state) => state.lessonPlans)
    const dispatch = useAppDispatch()
    const [pageComponents, setPageComponents] = React.useState([
        <TitleComponent text={lessonPlan.title} />,
        <DescriptionComponent text='description' />,
        <div></div>,
        <div></div>,
        <div></div>
        ])

    const eventHandler = (e:any, data:any) => {
      console.log('Event Type', e.type);
      console.log({e, data});
    }

    const handleDone = () => {
        dispatch(shareLessonPlanAPI(lessonPlan.title)) //title here
        dispatch(addLessonPlan(lessonPlan))
        navigate('/')
    }

    const handleAddComponent = (component: JSX.Element) => {
        // Find the index of the first element in the array that is a <div>
        const divIndex = pageComponents.findIndex((item) => React.isValidElement(item) && item.type === 'div');
        console.log(divIndex);

        // If a <div> is found, replace it with the new component
        if (divIndex !== -1) {
            const newComponents = [...pageComponents];
            newComponents.splice(divIndex, 1, component);
            console.log('Updated components array:', newComponents);
            setPageComponents(newComponents);
        } else {
            console.log('no more free slots on this page');
        }
    }

    useEffect(() => {
    }, []);

    /*let components = 
    [
    <TitleComponent text={lessonPlan.title} />,
    <DescriptionComponent text='description' />,
    <div></div>,
    <div></div>,
    <div></div>
    ]*/

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
            flexDirection:'column',
            flex:1,
            height:'auto',
            width:'auto',
            overflow: 'hidden'
        }}>
            <Box
            className='ComponentList'
            sx={{
                display:'grid',
                gridTemplateColumns:'1fr',
                flex:1,
            }}
            >
            <div className='Title' onClick={() => handleAddComponent(<TitleComponent text='New Title' />)}>
                <div style={{margin:'1.5rem', border:'2px solid black'}}>
                    <Title text='Title Component' />
                </div>
            </div>
            <div className='Description' onClick={() => handleAddComponent(<DescriptionComponent text='New Description' />)}>
                <div style={{margin:'1.5rem', border:'2px solid black', width:'inherit', height:'5rem'}}>
                    <DefaultText text='description Component' sx={{textAlign:'left', margin:'0.3rem'}} />
                </div>
            </div>
            <div className='CodeBlock' onClick={() => handleAddComponent(<TitleComponent text='New Title' />)}>
                <div style={{margin:'1.5rem', border:'2px solid black'}}>
                    <Title text='Code Block Component' sx={{lineHeight:'2.5rem'}} />
                </div>
            </div>
            </Box>
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
            key={pageComponents.map((component, index) => `${index}-${component.props.text}`).join('-')}
            components={pageComponents} />
        </Box>

      </Box>

    )
}

export default connect(null, { getLessonPlan, getLessonPlanAPI, shareLessonPlanAPI, addLessonPlan })(LessonPage)