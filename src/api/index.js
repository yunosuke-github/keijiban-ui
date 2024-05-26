import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token); // トークンをローカルストレージに保存
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken'); // トークンをローカルストレージから削除
  }
};

export const loadAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Get user failed');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'User creation failed');
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update thread');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/current-user');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

/* api/threads */
export const createThread = async (threadData) => {
  try {
    const response = await apiClient.post('/threads', threadData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'createThread creation failed');
  }
};

export const getThread = async (threadId) => {
  try {
    const response = await apiClient.get(`/threads/${threadId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Get Thread failed');
  }
};

export const getThreads = async (sort_by='created_at', order='desc', limit=null) => {
  var url = `/threads?sort_by=${sort_by}&order=${order}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Get Thread failed');
  }
};

export const searchThreads = async (query = '', category = '', sort_by = 'created_at', order = 'desc') => {
  try {
    const response = await apiClient.get(`/threads`, {
      params: {
        query,
        category,
        sort_by,
        order,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch threads');
  }
};

export const getMyThreads = async (user_id, sort_by='created_at', order='desc', limit=null) => {
  var url = `/threads?user_id=${user_id}&sort_by=${sort_by}&order=${order}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Get Thread failed');
  }
};

export const updateThread = async (threadId, updatedThread) => {
  try {
    const response = await apiClient.put(`/threads/${threadId}`, updatedThread);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update thread');
  }
};

export const deleteThread = async (threadId) => {
  try {
    const response = await apiClient.delete(`/threads/${threadId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete thread');
  }
};

/* api/comments */
export const createComment = async (commentData) => {
  try {
    const response = await apiClient.post('/comments', commentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Comment creation failed');
  }
};

export const getComments = async (thread_id=null, sort='created_at', order='desc', limit=null) => {
  var url = '/comments';
  if (thread_id) {
    url += `?thread_id=${thread_id}`;
  }
  url += `&sort_by=${sort}&order=${order}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Comment creation failed');
  }
};

export default apiClient;
