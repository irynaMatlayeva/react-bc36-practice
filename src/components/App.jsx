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
} from '../components';

import universityData from '../constants/universityData.json';

import TutorIcon from '../assets/images/teachers-emoji.png';
import AddIcon from '../assets/images/add.svg';
import CitiesIcon from '../assets/images/cities.svg';
import DepartmentIcon from '../assets/images/faculties-icon.svg';

class App extends React.Component {
  state = {
    tutors: universityData?.tutors ?? [],
    cities: universityData?.cities.map(city => ({ text: city })) ?? [],
    departments:
      universityData?.department.map(({ name }) => ({ text: name })) ?? [],
  };

  onEdit = () => {
    console.log('edit');
  };
  onDelete = () => {
    console.log('delete');
  };

  handleShowForm = () => {
    console.log('form');
  };

  handleToogleMenu = () => {
    console.log('card');
  };
  render() {
    return (
      <div className="app">
        <Sidebar />
        <Main>
          <Section
            title="Information about university"
            isColumn
            isRightPosition
          >
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
            <TutorsList tutors={this.state.tutors} />
            <Button
              text="add tutor"
              image={AddIcon}
              action={this.handleShowForm}
            />
          </Section>
          <Section title="cities" image={CitiesIcon}>
            <GeneralCardList
              listData={this.state.cities}
              isOpenMenu={this.handleToogleMenu}
            />
            <Button text="add city" image={AddIcon} />
          </Section>
          <Section title="department" image={DepartmentIcon}>
            <GeneralCardList
              listData={this.state.departments}
              isOpenMenu={this.handleToogleMenu}
            />
            <Button text="add department" image={AddIcon} />
          </Section>
        </Main>
      </div>
    );
  }
}

export default App;
