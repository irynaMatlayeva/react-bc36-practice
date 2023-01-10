import TutorsItem from './TutorsItem';
import { useSelector } from 'react-redux';

const TutorsList = ({ deleteTutor }) => {
  const tutors = useSelector(state => state.tutors);
  return tutors.map(tutor => (
    <TutorsItem key={tutor.id} {...tutor} deleteTutor={deleteTutor} />
  ));
};

export default TutorsList;
