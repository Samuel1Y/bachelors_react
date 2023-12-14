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

const savedState = localStorage.getItem('lessonPlanState');
const parsedState = savedState ? JSON.parse(savedState) as LessonPlanState : initialState

export const lessonPlanSlice = createSlice({
  name: 'lessonPlans',
  initialState: parsedState,
  reducers: {
      setCurrentLessonPlan (state, action) {
        state.currentLessonPlan = {...action.payload}
        save(state)
        return state
      },
    },
  },
)

function save (state: LessonPlanState){
  localStorage.setItem('lessonPlanState', JSON.stringify(state));
}

export const { setCurrentLessonPlan } = lessonPlanSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlan

export default lessonPlanSlice.reducer