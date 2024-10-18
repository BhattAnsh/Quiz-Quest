const host = import.meta.env.REACT_APP_API_HOST || "http://localhost:8000";
const API_BASE_URL = `${host}/api/v1`;

import axios from 'axios';

// API request function
const apiRequest = async (url, method, body = null) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const options = {
    method,
    url: `${API_BASE_URL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    withCredentials: true,
    data: body,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}, message: ${error.response.data.message || "Unknown error"}`);
    }
    throw error;
  }
};

// API functions
// User
export const registerAPI = (data) => apiRequest('/auth/register', 'POST', data);
export const loginAPI = (data) => apiRequest('/auth/login', 'POST', data);

// Quiz 
export const createQuiz = (quizData) => apiRequest('/quiz/createQuiz', 'POST', quizData);
export const getAllQuizzes = () => apiRequest('/quiz/getAllQuizzes', 'GET');
export const getQuizById = (quizId) => apiRequest(`/quiz/getQuiz/${quizId}`, 'GET');
export const updateQuiz = (quizId, quizData) => apiRequest(`/quizzes/updateQuiz/${quizId}`, 'PUT', quizData);
export const deleteQuiz = (quizId) => apiRequest(`/quiz/deleteQuiz/${quizId}`, 'DELETE');
export const publishQuiz = (quizId) => apiRequest(`/quiz/publish/${quizId}`, 'POST');

// Question 
export const addQuestion = (questionData) => apiRequest(`/quiz/createQuestion`, 'POST', questionData);
export const getAllQuestionsByQuiz = (quizId) => apiRequest(`/quiz/quizzes/${quizId}`, 'GET');
export const getQuestionById = (questionId) => apiRequest(`/quiz/questions/${questionId}`, 'GET');
export const updateQuestion = (questionId, questionData) => apiRequest(`/quiz/updateQuestion/${questionId}`, 'PUT', questionData);
export const deleteQuestion = (questionId) => apiRequest(`/quiz/deleteQuestion/${questionId}`, 'DELETE');
export const duplicateQuestion = (questionId) => apiRequest(`/quiz/questions/${questionId}/duplicate`, 'POST');
