import { Suspense, useState } from 'react';
import { Main, Sidebar } from '../components';

import { createCity, deleteCity, updateCity } from 'API/citiesAPI/citiesAPI';
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from 'API/departmentsAPI/departmentsAPI';
import { createTutor, deleteTutor } from 'API/tutorsAPI/tutorsAPI';

import { useCities, useDepartments, useTutors } from '../hooks';
import {
  DepartmentDetails,
  DepartmentsPages,
  NotFound,
  UniversityPages,
} from 'pages';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import DepartmentsDescription from 'pages/Departments/DepartmentsDetail/DepartmentsDescription';
import DepartmentsHistory from 'pages/Departments/DepartmentsDetail/DepartmentsHistory';

function App() {
  const [tutors, setTutors] = useTutors();
  const [cities, setCities] = useCities();
  const [departments, setDepartments] = useDepartments();
  const [showForm, setShowForm] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('university');
    }
  }, [navigate, pathname]);

  const addTutor = tutor => {
    createTutor(tutor).then(({ data }) => {
      setTutors([...tutors, data]);
      setShowForm(null);
    });
  };

  const handleTutorDelete = id => {
    deleteTutor(id).then(res => {
      const deletedId = res.data.id;
      const renewedTutors = tutors.filter(({ id }) => {
        return deletedId !== id;
      });
      setTutors(renewedTutors);
    });
    // this.setState(({ tutors }) => {
    //   return {
    //     tutors: [...tutors].filter(({ firstName }) => firstName !== name),
    //   };
    // });
  };

  const onEdit = () => {
    console.log('edit');
  };
  const onDelete = () => {
    console.log('delete');
  };

  const handleShowForm = formName => {
    setShowForm(showForm === formName ? null : formName);
  };

  const addCity = name => {
    if (cities.some(city => city.text.toLowerCase() === name.toLowerCase())) {
      alert('City exists');
      return;
    }
    createCity({ text: name }).then(({ data }) => {
      const newCity = {
        ...data,
        relation: 'cities',
      };
      setCities([...cities, newCity]);
      setShowForm(null);
    });
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
    if (relation === 'cities') {
      deleteCity(id).then(res => {
        const resId = res.data.id;
        const newCitiesArray = cities.filter(el => el.id !== resId);
        setCities(newCitiesArray);
      });
    } else {
      deleteDepartment(id).then(res => {
        const resId = res.data.id;
        const newDepartmentsArray = departments.filter(el => el.id !== resId);
        setDepartments(newDepartmentsArray);
      });
    }
  };

  const handleEditCard = data => {
    const { id, relation, name } = data;

    if (relation === 'cities') {
      updateCity(id, { id, text: name }).then(res => {
        const updatedId = res.data.id;
        const indexCity = cities.findIndex(item => item.id === updatedId);
        setCities(prev => [
          ...prev.slice(0, indexCity),
          { text: res.data.text, relation, id: updatedId },
          ...prev.slice(indexCity + 1),
        ]);
      });
    } else {
      updateDepartment(id, { id, text: name }).then(res => {
        const updatedId = res.data.id;
        const indexDepartment = departments.findIndex(
          item => item.id === updatedId
        );
        setCities(prev => [
          ...prev.slice(0, indexDepartment),
          { text: res.data.name, relation, id: updatedId },
          ...prev.slice(indexDepartment + 1),
        ]);
      });
    }

    // const elemIndex = this.state[relation].findIndex(item => item.text === id);
    // this.setState(prev => ({
    //   [relation]: [
    //     ...prev[relation].slice(0, elemIndex),
    //     { text: name, relation },
    //     ...prev[relation].slice(elemIndex + 1),
    //   ],
    // }));
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
                  tutors={tutors}
                  handleTutorDelete={handleTutorDelete}
                  showForm={showForm}
                  handleShowForm={handleShowForm}
                  addTutor={addTutor}
                  cities={cities}
                  handleEditCard={handleEditCard}
                  addCity={addCity}
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
