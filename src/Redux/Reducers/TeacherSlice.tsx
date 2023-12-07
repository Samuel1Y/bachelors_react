import { createSlice } from '@reduxjs/toolkit'
import { Teacher } from '../../Components/Types';
import { loginTeacherAPI } from '../Thunks/TeacherThunk';

// Define a type for the slice state
export interface TeacherSliceState {
  teacher: Teacher | null,
  isLoggedIn: boolean,
  status: any,
}

// Define the initial state using that type
const initialState = {
    teacher: {
        username: 'teacher1',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZWFjaGVyMSIsIm5iZiI6MTcwMTg2MDYyNiwiZXhwIjoxNzAxOTAzODI2LCJpYXQiOjE3MDE4NjA2MjYsImlzcyI6IkJhY2hlbG9yX2FwcCIsImF1ZCI6IkJhY2hlbG9yX2FwcCJ9.3rtxnBM8yp9dEZwOW_cFv5rXCh-n8tPWsbAhD2r6ZYk',
    },
    isLoggedIn: true,
    status: 'idle'
} as TeacherSliceState

const savedState = localStorage.getItem('teacherState');
const parsedState = savedState ? JSON.parse(savedState) as TeacherSliceState : initialState

export const TeacherSlice = createSlice({
  name: 'teacher',
  initialState: parsedState,
  reducers: {
      login (state, action) {
        return {...state, ...action.payload}
      },
      logOut (state) {
        state.teacher = null
        state.isLoggedIn = false
        //uncomment save state after testing
        //save(state)
        return state
      },
    },
    extraReducers: builder => {
      builder
        .addCase(loginTeacherAPI.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(loginTeacherAPI.fulfilled, (state, action) => {
            state.teacher = action.payload as Teacher 
            state.isLoggedIn = true
            state.status = 'idle'
            save(state)
            return state
        })
        .addCase(loginTeacherAPI.rejected, (state, action) => {
          return {...state, status: 'idle'}
        })
    }
  },
)

function save (state: TeacherSliceState){
  localStorage.setItem('teacherState', JSON.stringify(state));
}

export const { login, logOut } = TeacherSlice.actions

export default TeacherSlice.reducer