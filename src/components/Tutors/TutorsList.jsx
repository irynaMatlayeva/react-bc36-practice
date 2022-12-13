import TutorsItem from './TutorsItem';

const TutorsList = ({ tutors }) => {
  return tutors.map(tutor => <TutorsItem key={tutor.phone} {...tutor} />);
};

export default TutorsList;
