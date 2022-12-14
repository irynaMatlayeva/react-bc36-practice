import {
  AddItemForm,
  Button,
  GeneralCardList,
  Paper,
  Section,
  TutorForm,
  TutorsList,
  UniversityCard,
} from 'components';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import AddIcon from '../../assets/images/add.svg';
import CitiesIcon from '../../assets/images/cities.svg';
import TutorIcon from '../../assets/images/teachers-emoji.png';
import FORMS from '../../constants/forms';
import universityData from '../../constants/universityData.json';
import {
  createCitiesOperation,
  fetchCitiesOperation,
} from '../../store/cities/operations';
import { getCities } from '../../store/cities/citiesSlice';

const UniversityPages = ({
  onEdit,
  onDelete,
  handleTutorDelete,
  showForm,
  handleShowForm,
  handleDeleteCard,
  handleEditCard,
}) => {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);

  useEffect(() => {
    dispatch(fetchCitiesOperation());
  }, [dispatch]);

  return (
    <>
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
        <TutorsList deleteTutor={handleTutorDelete} />
        {showForm === FORMS.TUTOR_FORM && <TutorForm />}

        <Button
          text={showForm === FORMS.TUTOR_FORM ? 'Close form' : 'Add tutor'}
          image={AddIcon}
          action={() => handleShowForm(FORMS.TUTOR_FORM)}
        />
      </Section>
      <Section title="Cities" image={CitiesIcon}>
        <GeneralCardList
          listData={cities}
          deleteCard={handleDeleteCard}
          editCard={handleEditCard}
        />
        {showForm === FORMS.CITY_FORM && (
          <AddItemForm
            onSubmit={createCitiesOperation}
            title="Add city"
            placeholder="City"
          />
        )}
        <Button
          text={showForm === FORMS.CITY_FORM ? 'Close form' : 'Add city'}
          image={AddIcon}
          action={() => handleShowForm(FORMS.CITY_FORM)}
        />
      </Section>
    </>
  );
};

export default UniversityPages;
