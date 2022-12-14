import {
  Sidebar,
  Main,
  Paper,
  UniversityCard,
  TutorsList,
} from '../components';
import universityData from '../constants/universityData.json';
import Section from './Section/Section';
import TutorIcon from '../assets/images/teachers-emoji.png';

const App = () => {
  const onEdit = () => {
    console.log('edit');
  };
  const onDelete = () => {
    console.log('delete');
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
        </Section>
      </Main>
    </div>
  );
};

export default App;
