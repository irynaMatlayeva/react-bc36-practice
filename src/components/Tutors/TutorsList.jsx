import TutorsItem from './TutorsItem';
import PropTypes from 'prop-types';

const TutorsList = ({ tutors }) => {
  return tutors.map(tutor => <TutorsItem key={tutor.phone} {...tutor} />);
};

export default TutorsList;

TutorsList.propTypes = {
  tutors: PropTypes.array.isRequired,
};
