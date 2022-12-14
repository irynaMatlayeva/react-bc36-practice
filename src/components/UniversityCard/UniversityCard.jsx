import PropTypes from 'prop-types';
import { Paper } from 'components';

import universityImage from '../../assets/images/mock-university.svg';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';

import css from './UniversityCard.module.css';

const UniversityCard = ({ name, onEdit, onDelete }) => {
  return (
    <Paper classes={css.container}>
      <img
        className={css.universityImg}
        src={universityImage}
        alt="University"
      />
      <span className={css.title}>университет</span>
      <h3 className={css.name}>{name}</h3>
      <div className={css.controls}>
        <button onClick={onEdit} type="button" className={`${css.btn}`}>
          <img src={editImage} alt="foto" />
        </button>
        <button
          onClick={() => onDelete()}
          type="button"
          className={`${css.btn} ${css.deleteBtn}`}
        >
          <img src={deleteImage} alt="foto" />
        </button>
      </div>
    </Paper>
  );
};

export default UniversityCard;

UniversityCard.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
