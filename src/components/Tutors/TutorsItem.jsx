import { Paper } from 'components';
import PropTypes from 'prop-types';
import { ColumnItem, Container } from './TutorsItem.styled';
import PhoneImg from '../../assets/images/phone.svg';
import MailImg from '../../assets/images/mail.svg';
import LocationImg from '../../assets/images/pin.svg';
import { useDispatch } from 'react-redux';
import { deleteTutorAction } from 'store/tutors/actions';

const TutorsItem = ({ firstName, lastName, patronymic, phone, email, city, options, id }) => {
  const dispatch = useDispatch();
  return (
    <Paper>
      <Container>
        <ColumnItem>
          <span>{firstName}</span>
          <span>{lastName}</span>
          <span>{patronymic}</span>
        </ColumnItem>
        <ColumnItem>
          <span>
            <img src={PhoneImg} alt="img" />
            {phone}
          </span>
          <span>
            <img src={MailImg} alt="img" />
            {email}
          </span>
          <span>
            <img src={LocationImg} alt="img" />
            {city}
          </span>
        </ColumnItem>
        <ColumnItem>
          <p>{options}</p>
        </ColumnItem>
        <ColumnItem>
          <button type="button" onClick={() => dispatch(deleteTutorAction(id))}>
            Видалити
          </button>
        </ColumnItem>
      </Container>
    </Paper>
  );
};

export default TutorsItem;

TutorsItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  options: PropTypes.string,
  id: PropTypes.string.isRequired,
};
