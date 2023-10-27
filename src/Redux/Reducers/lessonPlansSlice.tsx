import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

// Define a type for the slice state
export interface LessonPlansState {
  code: string,
  title: string,
  status: any
}

// Define the initial state using that type
const initialState = {
    code: 'Initial Code',
    title: 'Initial Title',
    status: null
} as LessonPlansState


//Thunk functions, API
 const BASE_API_URL = 'https://api-bachelor.azurewebsites.net/api'
// send access code, API will return lesson plan (currently just title) 
export const getLessonPlanAPI = createAsyncThunk('lessonPlans/getLessonPlan', async (code: string) => {

  const response = await axios.get(`${BASE_API_URL}/unitplan/code/${code}`)
  try{
    const data = await response.data
    return data
  } catch (error) {
      throw new Error('Error fetching unit plan')
  }
});

// send title of the lesson, API will return access code that belongs to the sent lesson plan
export const shareLessonPlanAPI = createAsyncThunk('lessonPlans/shareLessonPlan', async (title: string) => {

  const UnitPlan = {id: 0, title: title, code: 0}

  const response = await axios.post(`${BASE_API_URL}/unitplan`, UnitPlan)
  try {
    if (response.status === 201) {
        const data = await response.data
        return data
    } else {
        return response.statusText
    }
  } catch (error) {
    return ('An error occurred' + error);
  }
})

export const lessonPlansSlice = createSlice({
  name: 'lessonPlans',
  initialState,
  reducers: {
      getLessonPlan (state, action) {
        return {...state, code: action.payload, title: "dummy title"}
      },
      shareLessonPlan (state, action) {
        return {...state, code: action.payload, title: "dummy title"}
      },
    },
    extraReducers: builder => {
      builder
        .addCase(getLessonPlanAPI.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getLessonPlanAPI.fulfilled, (state, action) => {
          // return {...state, ...action.payload, status: 'idle'}
          return {...state, title: action.payload.title, status: 'idle'}
        })
        .addCase(getLessonPlanAPI.rejected, (state, action) => {
          return {...state, title: 'error', status: 'idle'}
        })
        .addCase(shareLessonPlanAPI.fulfilled, (state, action) => {
          return {...state, code: action.payload.code, status: 'idle'}
        })
        .addCase(shareLessonPlanAPI.rejected, (state, action) => {
          return {...state, code: '-1', status: 'idle'}
        })
    }
  },
)


export const { getLessonPlan } = lessonPlansSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLessonPlan = (state: RootState) => state.lessonPlans

export default lessonPlansSlice.reducer