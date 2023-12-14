import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { CodeBlock, Description, Lesson, LessonPlan, Title } from '../../Components/Types';
import { getLessonAPI, shareLessonAPI } from '../Thunks/lessonThunk';
import { AddComponentPayload, GetLessonPayload, SaveLessonPagePayload, UpdateComponentPayload } from '../payloadTypes';

// Define a type for the slice state
export interface LessonPlanListState {
  lessonPlans: Array<LessonPlan>,
  lastSharedLessonCode: string,
  lastSharedLessonTitle: string,
  lastSharedLessonSharingTime: number,
  lastRedeemedLesson: Lesson | null,
  status: any,
}

// Define the initial state using that type
const initialState = {
  lessonPlans: [{
    // Add properties for your lesson plan here
    title: 'Saved Lessons',
    lessons: new Array<Lesson>(),
    // Add other properties as needed
  }],
  lastSharedLessonCode: 'none',
  lastSharedLessonTitle: 'none',
  lastSharedLessonSharingTime: -1,
  lastRedeemedLesson: null,
  status: 'idle'
} as LessonPlanListState

const savedState = localStorage.getItem('lessonPlanListState');
const parsedState = savedState ? JSON.parse(savedState) as LessonPlanListState : initialState

export const lessonPlanListSlice = createSlice({
  name: 'lessonPlanList',
  initialState: parsedState,
  reducers: {
      setLessonPlanList (state, action) {
        return {...state, ...action.payload}
      },
      addLessonPlan (state, action) {
        const LessonPlan = {
          // Add properties for your lesson plan here
          title: action.payload,
          lessons: new Array<Lesson>(),
          // Add other properties as needed
        }
        state.lessonPlans.push(LessonPlan)
        save(state)
        return state
      },
      removeLessonPlan (state, action) {
        const lessonPlanTitle = action.payload
        state.lessonPlans = state.lessonPlans.filter((lessonPlan) => lessonPlan.title !== lessonPlanTitle)

        save(state)
        return state
      },
      addLesson (state, action) {
        const lesson = {
          // Add properties for your lesson plan here
          title: action.payload.LessonTitle,
          username: "user",
          sharingTime: 120,
          codeBlocks: new Array<CodeBlock>(),
          descriptions: new Array<Description>(),
          titles: new Array<Title>(),
          numberOfPages: 1, 
        }
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === action.payload.LessonPlanTitle)?.lessons.push(lesson)
        save(state)
        return state
      },
      addRedeemedLesson (state, action) {
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === 'Saved Lessons')?.lessons.push(action.payload as Lesson)
        save(state)
        return state
      },
      removeLesson (state, action) {
        const lessonPlanTitle = action.payload.lessonPlanTitle
        const lessonTitle = action.payload.lessonTitle

        const updatedLessonPlans = state.lessonPlans.map((lessonPlan) => {
          if (lessonPlan.title === lessonPlanTitle) {
              lessonPlan.lessons = lessonPlan.lessons.filter((lesson) => lesson.title !== lessonTitle)
          }
          return lessonPlan
        });
        state.lessonPlans = updatedLessonPlans
        
        save(state)
        return state
      },
      setLastSharedLessonSharingTime (state, action) {
        state.lastSharedLessonSharingTime = action.payload
        save(state)
        return state
      },
      saveLessonPage (state, action) {
        const payload: SaveLessonPagePayload = action.payload

        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)!.titles = payload.titles
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)!.descriptions = payload.descriptions
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)!.codeBlocks = payload.codeBlocks
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)!.numberOfPages = payload.numberOfPages
        save(state)
        return state
      },
      addComponent(state, action) {
        const payload = action.payload as AddComponentPayload
        if(payload.component!.pageNumber! > state.lessonPlans.find((lessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson) => lesson.title === payload.lessonTitle)!.numberOfPages)
        {
          state.lessonPlans.find((lessonPlan) => lessonPlan.title === payload.lessonPlanTitle)!.lessons.find((lesson) => lesson.title === payload.lessonTitle)!.numberOfPages = payload.component.pageNumber || -1
        }
      
          switch (payload.component.type) {
            case 'TitleComponent':
              const newTitle: Title = {
                titleId: 0,
                slot: payload.component.slot || -1,
                pageNumber: payload.component.pageNumber || -1,
                text: payload.component.text || 'no text',
              }
              state.lessonPlans.find(
              (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )!.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )!.titles.push(newTitle)   
              break
            case 'DescriptionComponent':
              const newDescription: Description = {
                descriptionId: 0,
                slot: payload.component.slot || -1,
                pageNumber: payload.component.pageNumber || -1,
                text: payload.component.text || 'no text',
              }
              state.lessonPlans.find(
              (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )!.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )!.descriptions.push(newDescription)   
              break
              /*
            case 'CodeBlockComponent':
              state.lessonPlans.find(
                (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )?.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )?.codeBlocks.map((codeBlock) => {
              if(codeBlock.pageNumber === payload.pageNumber && codeBlock.slot === payload.slot)
              {
                codeBlock.jsonBlocks = payload.jsonBlocks || 'no json'
              }}
              )      
              break
              */
            default:
              console.log('wrong component type')
              break   
          }
        
        save(state)
        return state;     
      },
      updateComponent(state, action) {
        const payload = action.payload as UpdateComponentPayload
      
          switch (payload.type) {
            case 'TitleComponent':
              state.lessonPlans.find(
                (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )!.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )!.titles.forEach((title, index) => {
              if(title.pageNumber === payload.pageNumber && title.slot === payload.slot)
                {
                  title.text = payload.text || 'no text'
                }
              }
              )      
              break
            case 'DescriptionComponent':
              state.lessonPlans.find(
                (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )?.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )?.descriptions.forEach((description) => {
              if(description.pageNumber === payload.pageNumber && description.slot === payload.slot)
              {
                description.text = payload.text || 'no text'
              }}
              )      
              break
            case 'CodeBlockComponent':
              state.lessonPlans.find(
                (lessonPlan) => lessonPlan.title === payload.lessonPlanTitle
              )?.lessons.find((lesson) => lesson.title === payload.lessonTitle
              )?.codeBlocks.forEach((codeBlock) => {
              if(codeBlock.pageNumber === payload.pageNumber && codeBlock.slot === payload.slot)
              {
                codeBlock.jsonBlocks = payload.jsonBlocks || 'no json'
              }}
              )      
              break
            default:
              console.log('wrong component type')
              break
              
          }
        
        save(state)
        return state;
      }      
    },
    extraReducers: builder => {
      builder
        .addCase(getLessonAPI.pending, (state, action) => {
          state.lastRedeemedLesson = null
          state.status = 'loading'
          return state
        })
        .addCase(getLessonAPI.fulfilled, (state, action) => {
          state.lastRedeemedLesson = action.payload as Lesson
          state.status = 'idle'
          save(state)
          return state
        })
        .addCase(getLessonAPI.rejected, (state, action) => {
          return {...state, lastRedeemedLesson: null, status: 'idle'}
        })
        .addCase(shareLessonAPI.pending, (state, action) => {
          return {...state, status: 'loading'}
        })
        .addCase(shareLessonAPI.fulfilled, (state, action) => {
          const payload: GetLessonPayload = action.payload
          state.lastSharedLessonCode = String(payload.sharingCode)
          state.lastSharedLessonTitle = payload.title
          state.lastSharedLessonSharingTime = payload.sharingTime
          state.status = 'idle'
          save(state)
          return state
        })
        .addCase(shareLessonAPI.rejected, (state, action) => {
          return {...state, code: '-1', status: 'idle'}
        })
    }
  },
)

function save (state: LessonPlanListState){
  localStorage.setItem('lessonPlanListState', JSON.stringify(state));
}

export const { setLessonPlanList, addLessonPlan, removeLessonPlan, addLesson, addRedeemedLesson, removeLesson, saveLessonPage, setLastSharedLessonSharingTime, addComponent, updateComponent } = lessonPlanListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlanList

export default lessonPlanListSlice.reducer