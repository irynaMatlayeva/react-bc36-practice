import React, { useEffect } from 'react';
import FORMS from '../../constants/forms';

import { AddItemForm, Button, GeneralCardList, Section } from 'components';

import DepartmentIcon from '../../assets/images/faculties-icon.svg';
import AddIcon from '../../assets/images/add.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDepartmentsOperation,
  fetchDepartmentsOperation,
} from '../../store/departments/operations';
import { selectDepartments } from 'store/departments/selectors';

const DepartmentsPages = ({
  handleDeleteCard,
  handleEditCard,
  showForm,
  addDepartment,
  handleShowForm,
}) => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);

  useEffect(() => {
    dispatch(fetchDepartmentsOperation());
  }, [dispatch]);

  return (
    <>
      <Section title="Departments" image={DepartmentIcon}>
        <GeneralCardList
          listData={departments}
          deleteCard={handleDeleteCard}
          editCard={handleEditCard}
        />
        {showForm === FORMS.DEPARTMENTS_FORM && (
          <AddItemForm
            onSubmit={createDepartmentsOperation}
            title="Add department"
            placeholder="Department"
          />
        )}

        <Button
          text={showForm === FORMS.DEPARTMENTS_FORM ? 'Close form' : 'Add department'}
          image={AddIcon}
          action={() => handleShowForm(FORMS.DEPARTMENTS_FORM)}
        />
      </Section>
    </>
  );
};

export default DepartmentsPages;
