import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://63a99dbd594f75dc1dbb0bc9.mockapi.io';

axios.defaults.baseURL = BASE_URL;

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('/departments').then(({ data: department }) => {
      localStorage.setItem(
        'departments',
        JSON.stringify(
          department.map(({ name }) => ({
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
    });
  }, []);

  return [departments, setDepartments];
};

export default useDepartments;
