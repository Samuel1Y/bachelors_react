import { createAsyncThunk } from '@reduxjs/toolkit'
import { Lesson, Title} from '../../Components/Types';
import axios from 'axios';
import { RootState } from '../store';
import { useSelector } from 'react-redux';



//Thunk functions, API
const BASE_API_URL = 'https://api-bachelor.azurewebsites.net/api'
// send access code, API will return lesson plan (currently just title) 
export const getLessonAPI = createAsyncThunk('lessonPlanList/getLessonAPI', async (code: string) => {

  const response = await axios.get(`${BASE_API_URL}/Lesson/code/${code}`)
  try{
      var lesson: Lesson = {
          codeBlocks: response.data.codeBlocks,
          descriptions: response.data.descriptions,
          titles: new Array<Title>(),
          username: response.data.username,
          sharingTime: response.data.sharingTime,
          title: response.data.title,
          numberOfPages: response.data.numberOfPages,
      }
        return lesson
  } catch (error) {
      throw new Error('Error fetching Lesson')
  }
});


export const shareLessonAPI = createAsyncThunk('lessonPlanList/shareLessonAPI', async (lesson: Lesson, { getState }) => { // Add { getState } as a parameter
  const state = getState() as RootState;
  const authToken = state.teacher.teacher?.token || ''

  const response = await axios.post(`${BASE_API_URL}/Lesson`, lesson, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  
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