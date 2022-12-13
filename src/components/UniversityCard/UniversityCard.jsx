import css from './UniversityCard.module.css';
import { Paper } from 'components';
import universityImage from '../../assets/images/mock-university.svg';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';

const UniversityCard = ({ name, onEdit, onDelete }) => {
  return (
    <Paper classes={css.container}>
      <img className={css.universityImg} src={universityImage} alt="University Image" />
      <span className={css.title}>университет</span>
      <h3 className={css.name}>{name}</h3>
      <div className={css.controls}>
        <button onClick={onEdit} type="button" className={`${css.btn}`}>
          <img src={editImage} />
        </button>
        <button onClick={() => onEdit()} type="button" className={`${css.btn} ${css.deleteBtn}`}>
          <img src={deleteImage} />
        </button>
      </div>
    </Paper>
  );
};

export default UniversityCard;
