import React from 'react';
import FORMS from '../../constants/forms';

import { AddItemForm, Button, GeneralCardList, Section } from 'components';

import DepartmentIcon from '../../assets/images/faculties-icon.svg';
import AddIcon from '../../assets/images/add.svg';

const DepartmentsPages = ({
  departments,
  handleDeleteCard,
  handleEditCard,
  showForm,
  addDepartment,
  handleShowForm,
}) => {
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
            onSubmit={addDepartment}
            title="Add department"
            placeholder="Department"
          />
        )}

        <Button
          text={
            showForm === FORMS.DEPARTMENTS_FORM
              ? 'Close form'
              : 'Add department'
          }
          image={AddIcon}
          action={() => handleShowForm(FORMS.DEPARTMENTS_FORM)}
        />
      </Section>
    </>
  );
};

export default DepartmentsPages;
