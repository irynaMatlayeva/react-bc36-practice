import React from 'react';
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

class App extends React.Component {
  state = {
    tutors: universityData?.tutors ?? [],
    cities: universityData?.cities.map(city => ({ text: city })) ?? [],
    departments: universityData?.department.map(({ name }) => ({ text: name })) ?? [],
    showForm: null,
  };

  addTutor = tutor => {
    this.setState(({ tutors }) => {
      return { tutors: [...tutors, tutor] };
    });
  };

  deleteTutor = name => {
    this.setState(({ tutors }) => {
      return { tutors: [...tutors].filter(({ firstName }) => firstName !== name) };
    });
  };

  onEdit = () => {
    console.log('edit');
  };
  onDelete = () => {
    console.log('delete');
  };

  handleShowForm = formName => {
    this.setState(prevState => ({
      showForm: prevState.showForm === formName ? null : formName,
    }));
  };

  handleToogleMenu = () => {
    console.log('card');
  };

  addCity = name => {
    if (this.state.cities.some(city => city.text.toLowerCase() === name.toLowerCase())) {
      alert('City exists');
    } else {
      const newCity = {
        text: name,
      };
      this.setState(prevState => ({
        cities: [...prevState.cities, newCity],
      }));
    }
  };
  addDepartment = name => {
    if (
      this.state.departments.some(
        department => department.text.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Department exists');
    } else {
      const newDepartment = {
        text: name,
      };
      this.setState(prevState => ({
        departments: [...prevState.departments, newDepartment],
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <Sidebar />
        <Main>
          <Section title="Information about university" isColumn isRightPosition>
            <UniversityCard
              name={universityData.name}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
            ></UniversityCard>
            <Paper>
              <span>{universityData.description}</span>
            </Paper>
          </Section>
          <Section title="Tutors" image={TutorIcon}>
            <TutorsList tutors={this.state.tutors} deleteTutor={this.deleteTutor} />
            {this.state.showForm === FORMS.TUTOR_FORM && <TutorForm addTutor={this.addTutor} />}

            <Button
              text={this.state.showForm === FORMS.TUTOR_FORM ? 'Close form' : 'Add tutor'}
              image={AddIcon}
              action={() => this.handleShowForm(FORMS.TUTOR_FORM)}
            />
          </Section>
          <Section title="Cities" image={CitiesIcon}>
            <GeneralCardList listData={this.state.cities} isOpenMenu={this.handleToogleMenu} />
            {this.state.showForm === FORMS.CITY_FORM && (
              <AddItemForm onSubmit={this.addCity} title="Add city" placeholder="City" />
            )}
            <Button
              text={this.state.showForm === FORMS.CITY_FORM ? 'Close form' : 'Add city'}
              image={AddIcon}
              action={() => this.handleShowForm(FORMS.CITY_FORM)}
            />
          </Section>
          <Section title="Departments" image={DepartmentIcon}>
            <GeneralCardList listData={this.state.departments} isOpenMenu={this.handleToogleMenu} />
            {this.state.showForm === FORMS.DEPARTMENTS_FORM && (
              <AddItemForm
                onSubmit={this.addDepartment}
                title="Add department"
                placeholder="Department"
              />
            )}

            <Button
              text={
                this.state.showForm === FORMS.DEPARTMENTS_FORM ? 'Close form' : 'Add department'
              }
              image={AddIcon}
              action={() => this.handleShowForm(FORMS.DEPARTMENTS_FORM)}
            />
          </Section>
        </Main>
      </div>
    );
  }
}

export default App;
