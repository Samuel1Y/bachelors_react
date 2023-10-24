import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface LessonPlansState {
  code: string,
  title: string
}

// Define the initial state using that type
const initialState = {
    code: 'Initial Code',
    title: 'Initial Title'  
} as LessonPlansState

export const lessonPlansSlice = createSlice({
  name: 'lessonPlans',
  initialState,
  reducers: {
      getLessonPlan (state, action) {
        return {...state, code: action.payload, title: "dummy title"}
      },
    }
  },
)


export const { getLessonPlan } = lessonPlansSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlans

export default lessonPlansSlice.reducer