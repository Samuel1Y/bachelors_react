import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { CodeBlock, Description, Lesson, LessonPage, LessonPlan, Title } from '../../Components/Types';
import { getLessonAPI, shareLessonAPI } from '../Thunks/lessonThunk';
import { SaveLessonPagePayload } from '../payloadTypes';

// Define a type for the slice state
export interface LessonPlanListState {
  lessonPlans: Array<LessonPlan>,
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
    status: null
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
        return {...state, ...action.payload}
      },
      addLesson (state, action) {
        const Lesson = {
          // Add properties for your lesson plan here
          title: action.payload.LessonTitle,
          username: "user",
          sharingTime: 120,
          codeBlocks: new Array<CodeBlock>(),
          descriptions: new Array<Description>(),
          titles: new Array<Title>(),
          numberOfPages: 1, 
        }
        state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === action.payload.LessonPlanTitle)?.lessons.push(Lesson)
        save(state)
        return state
      },
      removeLesson (state, action) {
        return {...state, ...action.payload}
      },
      getLesson (state, action) {
        save(state)
        return {...state, code: action.payload, title: "dummy title"}
      },
      shareLesson (state, action) {
        return {...state, code: action.payload, title: "dummy title"}
      },
      saveLessonPage (state, action) {
        const payload: SaveLessonPagePayload = action.payload
        let lesson = state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan?.title === payload.lessonPlanTitle)?.lessons.find((lesson: Lesson) => lesson?.title === payload.lessonTitle)

        console.log(lesson)

        payload.titles.forEach((component) => {
          console.log(component)
          state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan?.title === payload.lessonPlanTitle)?.lessons.find((lesson: Lesson) => lesson?.title === payload.lessonTitle)?.titles.push(component)
        });
        payload.descriptions.forEach((component) => {
          console.log(component)
          state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)?.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)?.descriptions.push(component)
        });
        payload.codeBlocks.forEach((component) => {
          console.log(component)
          state.lessonPlans.find((lessonPlan: LessonPlan) => lessonPlan.title === payload.lessonPlanTitle)?.lessons.find((lesson: Lesson) => lesson.title === payload.lessonTitle)?.codeBlocks.push(component)
        });
        

        save(state)
        return state
      },
    },
    extraReducers: builder => {
      builder
        .addCase(getLessonAPI.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getLessonAPI.fulfilled, (state, action) => {
          // return {...state, ...action.payload, status: 'idle'}
          return {...state, title: action.payload.title, status: 'idle'}
        })
        .addCase(getLessonAPI.rejected, (state, action) => {
          return {...state, title: 'error', status: 'idle'}
        })
        .addCase(shareLessonAPI.fulfilled, (state, action) => {
          return {...state, code: action.payload.code, status: 'idle'}
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

export const { setLessonPlanList, addLessonPlan, removeLessonPlan, addLesson, removeLesson, saveLessonPage } = lessonPlanListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlanList

export default lessonPlanListSlice.reducer