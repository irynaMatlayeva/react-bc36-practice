import { fetchTutors } from 'API/tutorsAPI/tutorsAPI';
import { useEffect, useState } from 'react';

const useTutors = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    fetchTutors().then(({ data: tutors }) => {
      localStorage.setItem('tutors', JSON.stringify(tutors));
      const tutorFromLocalStorage = JSON.parse(localStorage.getItem('tutors'));
      tutorFromLocalStorage ? setTutors(tutorFromLocalStorage) : setTutors([]);
    });
  }, []);
  return [tutors, setTutors];
};

export default useTutors;
