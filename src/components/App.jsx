import { Suspense, useState } from 'react';
import { Main, Sidebar } from '../components';

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

function App() {
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
                />
              }
            />
            <Route path="/departments">
              <Route
                index
                element={
                  <DepartmentsPages
                    showForm={showForm}
                    handleShowForm={handleShowForm}
                  />
                }
              />
              <Route path=":departmentId" element={<DepartmentDetails />}>
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
