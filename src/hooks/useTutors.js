import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://63a99dbd594f75dc1dbb0bc9.mockapi.io';

axios.defaults.baseURL = BASE_URL;

const useTutors = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    axios.get('/tutors').then(({ data: tutors }) => {
      localStorage.setItem('tutors', JSON.stringify(tutors));
      const tutorFromLocalStorage = JSON.parse(localStorage.getItem('tutors'));
      tutorFromLocalStorage ? setTutors(tutorFromLocalStorage) : setTutors([]);
    });
  }, []);
  return [tutors, setTutors];
};

export default useTutors;
