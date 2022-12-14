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

const App = () => {
  // state = {};

  const onEdit = () => {
    console.log('edit');
  };
  const onDelete = () => {
    console.log('delete');
  };

  const handleShowForm = () => {
    console.log('form');
  };

  const handleToogleMenu = () => {
    console.log('card');
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
          <TutorsList tutors={universityData.tutors} />
          <Button text="add tutor" image={AddIcon} action={handleShowForm} />
        </Section>
        <Section title="cities" image={CitiesIcon}>
          <GeneralCardList
            listData={universityData.cities}
            isOpenMenu={handleToogleMenu}
          />
          <Button text="add city" image={AddIcon} />
        </Section>
      </Main>
    </div>
  );
};

export default App;
