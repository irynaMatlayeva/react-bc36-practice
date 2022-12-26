import { useState, useEffect } from 'react';
import universityData from '../constants/universityData.json';
const useTutors = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    localStorage.setItem('tutors', JSON.stringify(universityData?.tutors));
    const tutorFromLocalStorage = JSON.parse(localStorage.getItem('tutors'));
    tutorFromLocalStorage ? setTutors(tutorFromLocalStorage) : setTutors([]);
  }, []);
  return [tutors, setTutors];
};

export default useTutors;
