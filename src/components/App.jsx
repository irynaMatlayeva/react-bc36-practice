import { useState } from 'react';

import {
  Sidebar,
  Main,
  Paper,
  UniversityCard,
  TutorsList,
  Button,
  Section,
  GeneralCardList,
  TutorForm,
  AddItemForm,
} from '../components';
import FORMS from '../constants/forms';

import universityData from '../constants/universityData.json';

import TutorIcon from '../assets/images/teachers-emoji.png';
import AddIcon from '../assets/images/add.svg';
import CitiesIcon from '../assets/images/cities.svg';
import DepartmentIcon from '../assets/images/faculties-icon.svg';
import { useEffect } from 'react';
import { useTutors, useCities, useDepartments } from '../hooks';

function App() {
  const [tutors, setTutors] = useTutors();
  const [cities, setCities] = useCities();
  const [departments, setDepartments] = useDepartments();
  const [showForm, setShowForm] = useState(null);

  const addTutor = tutor => {
    setTutors([...tutors, tutor]);
    setShowForm(null);
  };

  const deleteTutor = name => {
    setTutors([...tutors.filter(({ firstName }) => firstName !== name)]);
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
    // this.setState(prevState => ({
    //   showForm: prevState.showForm === formName ? null : formName,
    // }));
  };

  const addCity = name => {
    if (cities.some(city => city.text.toLowerCase() === name.toLowerCase())) {
      alert('City exists');
    } else {
      const newCity = {
        text: name,
        relation: 'cities',
      };
      setCities([...cities, newCity]);
      setShowForm(null);
      // this.setState(prevState => ({
      //   cities: [...prevState.cities, newCity],
      //   showForm: null,
      // }));
    }
  };
  const addDepartment = name => {
    if (
      departments.some(
        department => department.text.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Department exists');
    } else {
      const newDepartment = {
        text: name,
        relation: 'departments',
      };
      setDepartments([...departments, newDepartment]);
      setShowForm(null);
      // this.setState(prevState => ({
      //   departments: [...prevState.departments, newDepartment],
      //   showForm: null,
      // }));
    }
  };

  const handleDeleteCard = (id, relation) => {
    if (relation === 'cities') {
      const newCitiesArray = cities.filter(({ text }) => text !== id);
      setCities(newCitiesArray);
    } else {
      const newDepertmentArray = departments.filter(({ text }) => text !== id);
      setDepartments(newDepertmentArray);
    }
    // this.setState(prevState => ({
    //   [relation]: prevState[relation].filter(({ text }) => text !== id),
    // }));
  };

  const handleEditCard = data => {
    const { id, relation, name } = data;

    if (relation === 'cities') {
      const indexCity = cities.findIndex(item => item.text === id);
      setCities(prev => [
        ...prev.slice(0, indexCity),
        { text: name, relation },
        ...prev.slice(indexCity + 1),
      ]);
    } else {
      const indexDepartment = departments.findIndex(item => item.text === id);
      setDepartments(prev => [
        ...prev.slice(0, indexDepartment),
        { text: name, relation },
        ...prev.slice(indexDepartment + 1),
      ]);
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
  console.log(departments);
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
          <TutorsList tutors={tutors} deleteTutor={deleteTutor} />
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
            <AddItemForm
              onSubmit={addCity}
              title="Add city"
              placeholder="City"
            />
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
            <AddItemForm
              onSubmit={addDepartment}
              title="Add department"
              placeholder="Department"
            />
          )}

          <Button
            text={
              showForm === FORMS.DEPARTMENTS_FORM
                ? 'Close form'
                : 'Add department'
            }
            image={AddIcon}
            action={() => handleShowForm(FORMS.DEPARTMENTS_FORM)}
          />
        </Section>
      </Main>
    </div>
  );
}

export default App;
