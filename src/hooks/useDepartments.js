import { fetchDepartments } from 'API/departmentsAPI/departmentsAPI';
import { useEffect, useState } from 'react';

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments().then(({ data: department }) => {
      localStorage.setItem(
        'departments',
        JSON.stringify(
          department.map(({ name, id }) => ({
            id,
            text: name,
            relation: 'departments',
          }))
        )
      );

      const departmentsFromLocalStorage = JSON.parse(localStorage.getItem('departments'));
      departmentsFromLocalStorage
        ? setDepartments(departmentsFromLocalStorage)
        : setDepartments([]);
    });
  }, []);

  return [departments, setDepartments];
};

export default useDepartments;
