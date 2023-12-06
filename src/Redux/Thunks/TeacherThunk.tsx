import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Teacher } from '../../Components/Types';

//Thunk functions, API
const BASE_API_URL = 'https://api-bachelor.azurewebsites.net/api'

// send title of the lesson, API will return access code that belongs to the sent lesson plan
export const loginTeacherAPI = createAsyncThunk('teacher/loginTeacherAPI', async ({ username, password }: { username: string, password: string }) => {
    const requestBody = {
        username: username,
        password: password,
    };
    const response = await axios.post(`${BASE_API_URL}/Teacher/Login`, requestBody)
    try {
        console.log(response.statusText)
        if (response.status === 201) {
            if (response.data.isEmpty) {
                return ('Wrong login credentials');
            } else {
                var Teacher: Teacher = { 
                    username: username, 
                    token: response.data }
                return Teacher
            }
        } else {
            return response.statusText
        }
    } catch (error) {
        console.log(response.statusText)
        return ('An error occurred' + error);
    }
})