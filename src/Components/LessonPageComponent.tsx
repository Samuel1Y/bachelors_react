import React, { useEffect, useRef } from 'react'

import { LessonPageComponentProps } from './Types'
import { Box } from '@mui/material'
import Draggable, { DraggableData } from 'react-draggable'
import PageComponent from './PageComponent'

export const LessonPageComponent: React.FC<LessonPageComponentProps> = ({
  sx,
  components,
}) => {

  const pageRef = useRef<HTMLElement | null>(null)
  const [componentsToRender, setComponentsToRender] = React.useState(components)

  const eventHandler = (e:any, data:DraggableData) => {
    console.log('Event Type', e.type);
    console.log({e, data});
  }

  const onStop = (e:any, data: DraggableData) => {
    console.log('Event Type', e.type);
    console.log({e, data});
  }

  const onDragEnd = (draggedIndex: number, targetIndex: number) => {
    if (draggedIndex !== targetIndex) {
      const updatedItems = componentsToRender as Array<any>
  
      // Swap the dragged item with the target item
      [updatedItems[draggedIndex], updatedItems[targetIndex]] = [updatedItems[targetIndex], updatedItems[draggedIndex]];
  
      setComponentsToRender(updatedItems);
    }
  };

  function checkCollision(componentIndex: number, deltaY: number): boolean {
    const componentHeight = pageRef.current?.offsetHeight! / 5;
    const componentTop = componentIndex * componentHeight + deltaY;
    
    for (let i = 0; i < componentsToRender.length; i++) {
      if (i !== componentIndex) {
        const otherComponentTop = i * componentHeight;
        const otherComponentBottom = otherComponentTop + componentHeight;
        
        if (componentTop >= otherComponentTop && componentTop <= otherComponentBottom) {
          return true; // Collision detected
        }
      }
    }
    
    return false; // No collision detected
  }

  const onDragEnd2 = (index: number, delta: number) => {
    const cellHeight = pageRef.current?.offsetHeight! / 5;
    const offset = Math.round(delta / cellHeight);
  
    if (offset !== 0) {
      const newIndex = index + offset;
      if (newIndex >= 0 && newIndex < componentsToRender.length) {
        const updatedItems = [...componentsToRender];
        const [draggedItem] = updatedItems.splice(index, 1);
  
        // Move the dragged item to the next available spot
        let nextIndex = newIndex;
        while (nextIndex < componentsToRender.length && updatedItems[nextIndex]) {
          nextIndex++;
        }
        updatedItems.splice(nextIndex, 0, draggedItem);
  
        setComponentsToRender(updatedItems);
      }
    }
  };
  

/*
      const newComponentsToRender = []

      for (let index = 0; index < 5; index++) {
        newComponentsToRender.push(
          <Draggable 
            key={index}
            bounds="parent"
            onDrag={eventHandler}
            onStop={(e, data) => {
              const newIndex = Math.floor(
                (index * data.y + (index + 1) * (data.y + data.y)) / 2
              );
              onDragEnd(index, newIndex);
            }}
            grid={[ (pageRef.current?.offsetWidth!), (pageRef.current?.offsetHeight!)/5]}
          >
            <div className={'component '+index.toString()} key={index}>
              {components ? components[index] : <div></div>}
            </div>
          </Draggable>
          )
  }
  setComponentsToRender(newComponentsToRender)
*/


  return (
    <Box
          className='Page'
          ref={pageRef}
              sx={{
                display: 'grid',
                gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
                position:'absolute',
                height:'40rem',
                width:'30rem',
                overflow: 'hidden',
                bgcolor:'white',
                ...sx
              }}>
              {componentsToRender?.map((component, index) => (
                <Draggable
                bounds="parent"
                onDrag={eventHandler}
                key={index}
                onStop={(e, data) => {
                  const collisionDetected = checkCollision(index, data.deltaY);
                  if (!collisionDetected) {
                    onDragEnd2(index, data.deltaY);
                  }                }}
                grid={[ pageRef.current?.offsetWidth!, pageRef.current?.offsetHeight!/5]}
              >
              <div key={index} className={'Component '+index} style={{maxWidth:'30rem', maxHeight:'8rem'}}>
                  <PageComponent key={index} component={component} />
              </div>
              </Draggable>
              ))}
        </Box>
)}