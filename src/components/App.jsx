import { Suspense, useState } from 'react';
import { Main, Sidebar } from '../components';

import { createCity, deleteCity, updateCity } from 'API/citiesAPI/citiesAPI';
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from 'API/departmentsAPI/departmentsAPI';

import {
  DepartmentDetails,
  DepartmentsPages,
  NotFound,
  UniversityPages,
} from 'pages';
import DepartmentsDescription from 'pages/Departments/DepartmentsDetail/DepartmentsDescription';
import DepartmentsHistory from 'pages/Departments/DepartmentsDetail/DepartmentsHistory';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { loadTutorsAction } from 'store/tutors/actions';
import { useDepartments } from '../hooks';

function App() {
  const [departments, setDepartments] = useDepartments();
  const [showForm, setShowForm] = useState(null);

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadTutorsAction());
  }, [dispatch]);

  useEffect(() => {
    if (pathname === '/') {
      navigate('university');
    }
  }, [navigate, pathname]);

  const onEdit = () => {
    console.log('edit');
  };
  const onDelete = () => {
    console.log('delete');
  };

  const handleShowForm = formName => {
    setShowForm(showForm === formName ? null : formName);
  };

  const addDepartment = name => {
    if (
      departments.some(
        department => department.text.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Department exists');
      return;
    }
    createDepartment({ name }).then(({ data: { id, name } }) => {
      const newDepartment = {
        id,
        text: name,
        relation: 'departments',
      };
      setDepartments([...departments, newDepartment]);
      setShowForm(null);
    });
  };

  const handleDeleteCard = (id, relation) => {
    if (relation !== 'cities') {
      deleteDepartment(id).then(res => {
        const resId = res.data.id;
        const newDepartmentsArray = departments.filter(el => el.id !== resId);
        setDepartments(newDepartmentsArray);
      });
    }
  };

  const handleEditCard = data => {
    const { id, relation, name } = data;

    if (relation !== 'cities') {
      updateDepartment(id, { id, text: name }).then(res => {
        const updatedId = res.data.id;
        const indexDepartment = departments.findIndex(
          item => item.id === updatedId
        );
        setDepartments(prev => [
          ...prev.slice(0, indexDepartment),
          { text: res.data.name, relation, id: updatedId },
          ...prev.slice(indexDepartment + 1),
        ]);
      });
    }
  };
  return (
    <div className="app">
      <Sidebar />
      <Main>
        <Suspense fallback={<span>Loading...</span>}>
          <Routes>
            <Route
              path="/university"
              element={
                <UniversityPages
                  onEdit={onEdit}
                  onDelete={onDelete}
                  showForm={showForm}
                  handleShowForm={handleShowForm}
                  handleEditCard={handleEditCard}
                />
              }
            />
            <Route path="/departments">
              <Route
                index
                element={
                  <DepartmentsPages
                    departments={departments}
                    handleDeleteCard={handleDeleteCard}
                    handleEditCard={handleEditCard}
                    showForm={showForm}
                    addDepartment={addDepartment}
                    handleShowForm={handleShowForm}
                  />
                }
              />
              <Route
                path=":departmentId"
                element={<DepartmentDetails departments={departments} />}
              >
                <Route
                  path="description"
                  element={<DepartmentsDescription />}
                />
                <Route path="history" element={<DepartmentsHistory />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Main>
    </div>
  );
}

export default App;
