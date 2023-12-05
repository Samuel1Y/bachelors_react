import { Box, TextField } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { connect } from 'react-redux'
import { LessonPageComponent } from '../Components/LessonPageComponent'
import { DefaultButton } from '../Components/DefaultButton'
import TitleComponent from '../Components/TitleComponent'
import { addLessonPlan, saveLessonPage } from '../Redux/Reducers/LessonPlanListSlice'
import DescriptionComponent from '../Components/DescriptionComponent'
import { DefaultText, Title } from '../Components/Text'
import { SaveLessonPagePayload } from '../Redux/payloadTypes'
import { CodeBlockComponentProps, Description, Lesson, LessonPlan, PageComponent, Title as TitleType } from '../Components/Types'


function LessonPage() {

    
    const navigate = useNavigate() //use for navigation
    const { pathname } = useLocation()
    const lessonPlanList = useAppSelector((state) => state.lessonPlanList.lessonPlans)

    const dispatch = useAppDispatch()
    /* const [pageComponents, setPageComponents] = React.useState(
        PageComponent[
            <TitleComponent text={pathname.split('/')[2]} type={'TitleComponent'} />,
            <DescriptionComponent text='description' type={'DescriptionComponent'} />,
        ])   */
    //    lessonPlanList.find((lessonPlan) => lessonPlan.title === pathname.split('/')[1])
    //    .lessons.find((lesson) => lesson.title === pathname.split('/')[2]).

    const [pageComponents, setPageComponents] = React.useState(Array<PageComponent>())

    const createPageComponents = () => {
        const lessonPlanTitle = pathname.split('/')[1]
        const lessonTitle = pathname.split('/')[2]
        const lesson = lessonPlanList.find((lessonPlan: LessonPlan) => lessonPlan.title === lessonPlanTitle)?.lessons.find((lesson: Lesson) => lesson.title === lessonTitle)

        if(lesson !== undefined)
        {
        const { codeBlocks, descriptions, titles } = lesson

      
        // Initialize array with null values
        const allComponents: Array<PageComponent | null> = new Array(5).fill(null);
      
        //add component to the array at the specified index
        const addComponent = (component: PageComponent) => {
            if(component.slot !== undefined)
            {
                const index = component.slot - 1;
                allComponents[index] = component;
            }
        }
      
        // Add codeBlocks to the array
        codeBlocks.forEach((codeBlock, index) => {
          addComponent({
            type: 'CodeBlockComponent',
            codeBlockId: index + 1,
            slot: codeBlock.slot,
            pageNumber: codeBlock.pageNumber,
            jsonBlocks: codeBlock.jsonBlocks,
          })
        })
      
        // Add descriptions to the array
        descriptions.forEach((description, index) => {
          addComponent({
            type: 'DescriptionComponent',
            text: description.text,
            slot: description.slot,
            pageNumber: description.pageNumber,
          })
        })
      
        // Add titles to the array
        titles.forEach((title, index) => {
          addComponent({
            type: 'TitleComponent',
            text: title.text,
            slot: title.slot,
            pageNumber: title.pageNumber,
          })
        })
        // Remove null values from the array
        const result = allComponents.filter((component) => component !== null) as Array<PageComponent>;
      
        setPageComponents(result)
    }
      }

    const eventHandler = (e:any, data:any) => {
      console.log('Event Type', e.type);
      console.log({e, data});
    }

    const handleDone = () => {
        const payload = {
            lessonPlanTitle: pathname.split('/')[1],
            lessonTitle: pathname.split('/')[2],
            titles: [],
            descriptions: [],
            codeBlocks: []
        } as SaveLessonPagePayload

        pageComponents.forEach((component, index) => {
            switch (component.type) {
              case 'TitleComponent':
                const title: TitleType = {
                  titleId: 0,
                  slot: component.slot || -1,
                  pageNumber: component.pageNumber || -1,
                  text: component.text || 'no text'
                }
                //lesson.titles.push(title)
                payload.titles.push(title as TitleType)
                break
                case 'DescriptionComponent':
                const description: Description = {
                  descriptionId: 0,
                  slot: component.slot || -1,
                  pageNumber: component.pageNumber || -1,
                  text: component.text || 'no text'
                }
                payload.descriptions.push(description as Description)
                break
              case 'CodeBlockComponent':
                //Implement
                break
              default:
                console.log(`Unknown component type: ${component}`);
            }
          });
         dispatch(saveLessonPage(payload))
        navigate('/'+pathname.split('/')[0]+ pathname.split('/')[1])
    }

    const handleAddComponent = (newComponent: PageComponent) => {
        const slot = pageComponents.length + 1
        let pageNumber = 1

        if(pageComponents.length < 5)
        {
            setPageComponents((prevComponents) => [...prevComponents, {...newComponent, slot, pageNumber }]);
        }
        else {
            console.log('no more free slots on this page')
            pageNumber++
        }
      };

    useEffect(() => {
        if(lessonPlanList.length > 0)
        {
            createPageComponents()
        }
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
            <div className='Title' onClick={() => handleAddComponent({ type: 'TitleComponent', text: 'New Title' })}>
                <div style={{margin:'1.5rem', border:'2px solid black'}}>
                    <Title text='Title Component' />
                </div>
            </div>
            <div className='Description' onClick={() => handleAddComponent({ type: 'DescriptionComponent', text: 'New Description' })}>
                <div style={{margin:'1.5rem', border:'2px solid black', width:'inherit', height:'5rem'}}>
                    <DefaultText text='description Component' sx={{textAlign:'left', margin:'0.3rem'}} />
                </div>
            </div>
            <div className='CodeBlock' onClick={() => handleAddComponent(<TitleComponent text='New Title' type={'TitleComponent'} />)}>
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
            key={pageComponents.map((component, index) => `${index}-${component.type}`).join('-')}
            components={pageComponents} />
        </Box>

      </Box>

    )
}

export default connect(null, { addLessonPlan, saveLessonPage })(LessonPage)