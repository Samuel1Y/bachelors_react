import { createAsyncThunk } from '@reduxjs/toolkit'
import { Lesson} from '../../Components/Types';
import axios from 'axios';

//Thunk functions, API
const BASE_API_URL = 'https://api-bachelor.azurewebsites.net/api'
// send access code, API will return lesson plan (currently just title) 
export const getLessonAPI = createAsyncThunk('lessonPlanList/getLessonAPI', async (code: string) => {

  const response = await axios.get(`${BASE_API_URL}/Lesson/code/${code}`)
  try{
    const data = await response.data
    return data
  } catch (error) {
      throw new Error('Error fetching Lesson')
  }
});

// send title of the lesson, API will return access code that belongs to the sent lesson plan
export const shareLessonAPI = createAsyncThunk('lessonPlanList/shareLessonAPI', async (lesson: Lesson) => {
  const response = await axios.post(`${BASE_API_URL}/Lesson`, lesson)
  try {
    console.log(response.statusText)
    if (response.status === 201) {
        const data = await response.data
        return data
    } else {
        return response.statusText
    }
  } catch (error) {
    console.log(response.statusText)
    return ('An error occurred' + error);
  }
})