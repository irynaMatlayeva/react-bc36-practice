import {
  Sidebar,
  Main,
  Paper,
  UniversityCard,
  TutorsList,
} from '../components';
import universityData from '../constants/universityData.json';

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
        <UniversityCard
          name={universityData.name}
          onEdit={onEdit}
          onDelete={onDelete}
        ></UniversityCard>
        <Paper>
          <span>{universityData.description}</span>
        </Paper>
        <TutorsList tutors={universityData.tutors} />
      </Main>
    </div>
  );
};

export default App;
