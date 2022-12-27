import axios from 'axios';
export const URL = {
  DEPARTMENTS: 'departments',
  CITIES: 'cities',
  TUTORS: 'tutors',
};
const BASE_URL = process.env.REACT_APP_URL;
const axiosDB = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = url => {
  try {
    return axiosDB.get(`/${url}`);
  } catch (error) {
    return {
      error,
    };
  }
};

export const postData = (url, data) => {
  try {
    return axiosDB.post(`/${url}`, JSON.stringify(data));
  } catch (error) {
    return {
      error,
    };
  }
};

export const updateData = (url, data) => {
  try {
    return axiosDB.put(`/${url}`, data);
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteData = url => {
  try {
    return axiosDB.delete(`/${url}`);
  } catch (error) {
    return {
      error,
    };
  }
};
