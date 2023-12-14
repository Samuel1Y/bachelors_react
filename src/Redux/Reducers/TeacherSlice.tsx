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
    teacher: null,
    isLoggedIn: false,
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