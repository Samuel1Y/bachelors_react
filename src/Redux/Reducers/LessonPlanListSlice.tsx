import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { CodeBlock, Description, Lesson, LessonPage, LessonPlan } from '../../Components/Types';

// Define a type for the slice state
export interface LessonPlanListState {
  lessonPlans: Array<LessonPlan>,
  status: null,
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

export const lessonPlanListSlice = createSlice({
  name: 'lessonPlanList',
  initialState,
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
          numberOfPages: 1, 
        }
        state.lessonPlans.find((lessonPlan) => lessonPlan.title === action.payload.LessonPlanTitle)?.lessons.push(Lesson)
        return state
      },
      removeLesson (state, action) {
        return {...state, ...action.payload}
      },
    },
  },
)


export const { setLessonPlanList, addLessonPlan, removeLessonPlan, addLesson, removeLesson } = lessonPlanListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlanList

export default lessonPlanListSlice.reducer