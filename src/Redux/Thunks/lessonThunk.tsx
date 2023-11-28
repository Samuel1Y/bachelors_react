import { createAsyncThunk } from '@reduxjs/toolkit'
import { Lesson} from '../../Components/Types';
import axios from 'axios';

//Thunk functions, API
const BASE_API_URL = 'https://api-bachelor.azurewebsites.net/api'
// send access code, API will return lesson plan (currently just title) 
export const getLessonAPI = createAsyncThunk('lessonPlanList/getLesson', async (code: string) => {

  const response = await axios.get(`${BASE_API_URL}/Lesson/code/${code}`)
  try{
    const data = await response.data
    return data
  } catch (error) {
      throw new Error('Error fetching unit plan')
  }
});

// send title of the lesson, API will return access code that belongs to the sent lesson plan
export const shareLessonAPI = createAsyncThunk('lessonPlanList/shareLesson', async (lesson: Lesson) => {

  const response = await axios.post(`${BASE_API_URL}/Lesson`, lesson)
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