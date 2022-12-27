import { useState } from 'react';
import {
  AddItemForm,
  Button,
  GeneralCardList,
  Main,
  Paper,
  Section,
  Sidebar,
  TutorForm,
  TutorsList,
  UniversityCard,
} from '../components';
import FORMS from '../constants/forms';

import universityData from '../constants/universityData.json';

import { createCity, deleteCity, updateCity } from 'API/citiesAPI/citiesAPI';
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from 'API/departmentsAPI/departmentsAPI';
import { createTutor, deleteTutor } from 'API/tutorsAPI/tutorsAPI';
import AddIcon from '../assets/images/add.svg';
import CitiesIcon from '../assets/images/cities.svg';
import DepartmentIcon from '../assets/images/faculties-icon.svg';
import TutorIcon from '../assets/images/teachers-emoji.png';
import { useCities, useDepartments, useTutors } from '../hooks';

function App() {
  const [tutors, setTutors] = useTutors();
  const [cities, setCities] = useCities();
  const [departments, setDepartments] = useDepartments();
  const [showForm, setShowForm] = useState(null);

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
    if (departments.some(department => department.text.toLowerCase() === name.toLowerCase())) {
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
        const indexDepartment = departments.findIndex(item => item.id === updatedId);
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
        <Section title="Information about university" isColumn isRightPosition>
          <UniversityCard
            name={universityData.name}
            onEdit={onEdit}
            onDelete={onDelete}
          ></UniversityCard>
          <Paper>
            <span>{universityData.description}</span>
          </Paper>
        </Section>
        <Section title="Tutors" image={TutorIcon}>
          <TutorsList tutors={tutors} deleteTutor={handleTutorDelete} />
          {showForm === FORMS.TUTOR_FORM && <TutorForm addTutor={addTutor} />}

          <Button
            text={showForm === FORMS.TUTOR_FORM ? 'Close form' : 'Add tutor'}
            image={AddIcon}
            action={() => handleShowForm(FORMS.TUTOR_FORM)}
          />
        </Section>
        <Section title="Cities" image={CitiesIcon}>
          <GeneralCardList
            listData={cities}
            deleteCard={handleDeleteCard}
            editCard={handleEditCard}
          />
          {showForm === FORMS.CITY_FORM && (
            <AddItemForm onSubmit={addCity} title="Add city" placeholder="City" />
          )}
          <Button
            text={showForm === FORMS.CITY_FORM ? 'Close form' : 'Add city'}
            image={AddIcon}
            action={() => handleShowForm(FORMS.CITY_FORM)}
          />
        </Section>
        <Section title="Departments" image={DepartmentIcon}>
          <GeneralCardList
            listData={departments}
            deleteCard={handleDeleteCard}
            editCard={handleEditCard}
          />
          {showForm === FORMS.DEPARTMENTS_FORM && (
            <AddItemForm onSubmit={addDepartment} title="Add department" placeholder="Department" />
          )}

          <Button
            text={showForm === FORMS.DEPARTMENTS_FORM ? 'Close form' : 'Add department'}
            image={AddIcon}
            action={() => handleShowForm(FORMS.DEPARTMENTS_FORM)}
          />
        </Section>
      </Main>
    </div>
  );
}

export default App;
