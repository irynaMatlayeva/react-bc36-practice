import { useState, useEffect } from 'react';
import universityData from '../constants/universityData.json';
const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    localStorage.setItem(
      'departments',
      JSON.stringify(
        universityData?.department.map(({ name }) => ({
          text: name,
          relation: 'departments',
        }))
      )
    );

    const departmentsFromLocalStorage = JSON.parse(
      localStorage.getItem('departments')
    );
    departmentsFromLocalStorage
      ? setDepartments(departmentsFromLocalStorage)
      : setDepartments([]);
  }, []);

  return [departments, setDepartments];
};

export default useDepartments;
