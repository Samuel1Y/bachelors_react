import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { LessonPlan } from '../../Components/Types';

// Define a type for the slice state
export interface LessonPlanListState {
  lessonPlans: Array<LessonPlan>,
  status: any,
}

// Define the initial state using that type
const initialState = {
    lessonPlans: new Array<LessonPlan>(),
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
        state.lessonPlans.push(action.payload)
        return state
      },
      removeLessonPlan (state, action) {
        return {...state, ...action.payload}
      },
    },
  },
)


export const { setLessonPlanList, addLessonPlan, removeLessonPlan } = lessonPlanListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlanList

export default lessonPlanListSlice.reducer