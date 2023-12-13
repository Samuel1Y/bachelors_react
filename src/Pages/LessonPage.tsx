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
import CodeBlockComponent from '../Components/CodeBlockComponent'


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

    const [lessonPages, setLessonPages] = React.useState<Array<Array<PageComponent>>>(() => {
      const initialPage: Array<PageComponent> = [];
      return [initialPage];
  });
  // State to manage the current page index
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);

  const addPage = () => {
    const newPage: Array<PageComponent> = []
    const pages = lessonPages
    pages.push(newPage)
    setLessonPages(pages)
    setCurrentPageIndex(lessonPages.length-1)

  }

    const createPageComponents = () => {
      const lessonPlanTitle = pathname.split('/')[1];
      const lessonTitle = pathname.split('/')[2];
      const lesson = lessonPlanList
        .find((lessonPlan: LessonPlan) => lessonPlan.title === lessonPlanTitle)
        ?.lessons.find((lesson: Lesson) => lesson.title === lessonTitle)
    
      if (lesson !== undefined) {
        // Initialize array with null values for each page
        const allComponents: Array<Array<PageComponent | null>> = new Array(lesson.numberOfPages)
          .fill(null)
          .map(() => new Array(5).fill(null))
        // Add component to the array at the specified index for each page
        const addComponent = (component: PageComponent, pageIndex: number) => {
          if (component.slot !== undefined) {
            const index = component.slot - 1;
            allComponents[pageIndex][index] = component;
          }
        };

        // Iterate over each page
        for (let pageIndex = 0; pageIndex < lesson.numberOfPages; pageIndex++) {
          let codeBlocks = lesson.codeBlocks.filter((codeBlock) => codeBlock.pageNumber === pageIndex + 1);
          let descriptions = lesson.descriptions.filter((description) => description.pageNumber === pageIndex + 1);
          let titles = lesson.titles.filter((title) => title.pageNumber === pageIndex + 1);
    
          // Add codeBlocks to the array for the current page
          codeBlocks.forEach((codeBlock, index) => {
            addComponent(
              {
                type: 'CodeBlockComponent',
                codeBlockId: index + 1,
                slot: codeBlock.slot,
                pageNumber: codeBlock.pageNumber,
                jsonBlocks: codeBlock.jsonBlocks,
              },
              pageIndex
            );
          });
    
          // Add descriptions to the array for the current page
          descriptions.forEach((description, index) => {
            addComponent(
              {
                type: 'DescriptionComponent',
                text: description.text,
                slot: description.slot,
                pageNumber: description.pageNumber,
              },
              pageIndex
            );
          });
    
          // Add titles to the array for the current page
          titles.forEach((title, index) => {
            addComponent(
              {
                type: 'TitleComponent',
                text: title.text,
                slot: title.slot,
                pageNumber: title.pageNumber,
              },
              pageIndex
            );
          });
        }
    
        // Remove null values from the array for each page
        const result = allComponents.map((pageComponents) =>
          pageComponents.filter((component) => component !== null) as Array<PageComponent>
        )
  
        setLessonPages(result)
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
            codeBlocks: [],
            numberOfPages: -1
        } as SaveLessonPagePayload

        lessonPages.forEach((page, pageIndex) => {
          page.forEach((component) => {
            switch (component.type) {
              case 'TitleComponent':
                payload.titles.push({
                  titleId: 0,
                  slot: component.slot || -1,
                  pageNumber: pageIndex + 1,
                  text: component.text || 'no text',
                });
                break;
              case 'DescriptionComponent':
                payload.descriptions.push({
                  descriptionId: 0,
                  slot: component.slot || -1,
                  pageNumber: pageIndex + 1,
                  text: component.text || 'no text',
                });
                break;
              case 'CodeBlockComponent':
                payload.codeBlocks.push({
                  codeBlockId: 0,
                  slot: component.slot || -1,
                  pageNumber: pageIndex + 1,
                  jsonBlocks: component.jsonBlocks || 'no jsonBlocks',
                });
                break;
              // Handle other component types as needed
              default:
                console.log(`Unknown component type: ${component}`);
            }
          });
          payload.numberOfPages = pageIndex+1
        });
         dispatch(saveLessonPage(payload))
        navigate('/'+pathname.split('/')[0]+ pathname.split('/')[1])
    }

    const handleAddComponent = (newComponent: PageComponent) => {
      const slot = lessonPages[currentPageIndex].length + 1;
      const pageNumber = 1;
  
      if (lessonPages[currentPageIndex].length < 5) {
        setLessonPages((prevPages) => {
          const updatedPages = [...prevPages];
          updatedPages[currentPageIndex] = [
            ...updatedPages[currentPageIndex],
            { ...newComponent, slot, pageNumber },
          ];
          return updatedPages;
        });
      } else {
        console.log('No more free slots on this page');
      }
      }

    useEffect(() => {
        if(lessonPlanList.length > 0)
        {
          createPageComponents()
        }
    }, []);

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
            <div className='CodeBlock' onClick={() => handleAddComponent({ type: 'CodeBlockComponent', jsonBlocks: '' })}>
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
            {lessonPages[currentPageIndex] && <LessonPageComponent
            key={lessonPages[currentPageIndex].map((component, index) => `${index}-${component.type}`).join('-')}
            components={lessonPages[currentPageIndex]} />}
            <Box
            sx={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              gap:'1rem',
              position:'absolute',
              bottom:'1rem',
              scale:'0.7'
            }}>
              <DefaultButton disabled={currentPageIndex <= 0} label='previous' onClick={() => setCurrentPageIndex(currentPageIndex-1)} />
              <DefaultButton label='New Page' onClick={() => addPage()}
                sx={{
                  backgroundColor:'green',
                  ':hover': {
                    backgroundColor:'lime',
                  },
                }} />
              <DefaultButton disabled={currentPageIndex === lessonPages.length - 1} label='next' onClick={() => setCurrentPageIndex(currentPageIndex+1)} />
            </Box>

        </Box>

      </Box>

    )
}

export default connect(null, { addLessonPlan, saveLessonPage })(LessonPage)