import TutorsItem from './TutorsItem';
import PropTypes from 'prop-types';

const TutorsList = ({ tutors, deleteTutor }) => {
  return tutors.map(tutor => <TutorsItem key={tutor.id} {...tutor} deleteTutor={deleteTutor} />);
};

export default TutorsList;

TutorsList.propTypes = {
  tutors: PropTypes.array.isRequired,
};
