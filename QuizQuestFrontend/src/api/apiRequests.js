const API_BASE_URL = import.meta.env.REACT_APP_API_HOST || "http://localhost:3000";

// API request function
const apiRequest = async (url, method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: body ? JSON.stringify(body) : null
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || "Unknown error"}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; 
  }
};

// API functions
export const registerAPI = (data) => apiRequest(`${API_BASE_URL}/user/register`, 'POST', data);
export const loginAPI = (data) => apiRequest(`${API_BASE_URL}/user/login`, 'POST', data);

export const createQuiz = (quizData) => apiRequest(`${API_BASE_URL}/quizcreate`, 'POST', quizData);
export const addQuestion = (questionData) => apiRequest(`${API_BASE_URL}/quiz/addQuestion`, 'POST', questionData);
export const editQuiz = (quizData) => apiRequest(`${API_BASE_URL}/quiz/editQuiz`, 'PUT', quizData);
export const deleteQuiz = (quizId) => apiRequest(`${API_BASE_URL}/quiz/deleteQuiz`, 'DELETE', { quizId });
export const editQuestion = (questionData) => apiRequest(`${API_BASE_URL}/quiz/editQuestion`, 'PUT', questionData);
export const deleteQuestion = (questionId) => apiRequest(`${API_BASE_URL}/quiz/delQuestion`, 'DELETE', { questionId });
export const testEndpoint = () => apiRequest(`${API_BASE_URL}/quiz/test`, 'GET');