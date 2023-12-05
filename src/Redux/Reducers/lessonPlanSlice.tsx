import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { LessonPlan } from '../../Components/Types';

// Define a type for the slice state
export interface LessonPlanState {
  currentLessonPlan: LessonPlan | null,
  status: any
}

// Define the initial state using that type
const initialState = {
    currentLessonPlan: null,
    status: null
} as LessonPlanState


export const lessonPlanSlice = createSlice({
  name: 'lessonPlans',
  initialState,
  reducers: {
      setCurrentLessonPlan (state, action) {
        return {...state, currentLessonPlan: action.payload}
      },
    },
  },
)


export const { setCurrentLessonPlan } = lessonPlanSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlan

export default lessonPlanSlice.reducer