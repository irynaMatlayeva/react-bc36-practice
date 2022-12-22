import React from 'react';
import Button from '../../Button/Button';
import AddIcon from '../../../assets/images/add.svg';
import { Field, Form, Formik } from 'formik';
import { ErrMsg } from '../TutorForm/TutorForm.styled';
import { object, string } from 'yup';

function AddItemForm({ onSubmit, title, placeholder, idItem, relation }) {
  const INITIAL_VALUES = {
    name: idItem || '',
  };
  const VALIDATION_SCHEMA = object().shape({
    name: string().min(2, 'Minimum 2 symbols'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const data = idItem
      ? { id: idItem, relation, name: values.name }
      : values.name;
    onSubmit(data);
    resetForm();
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={VALIDATION_SCHEMA}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div>
            <h3>{title}</h3>
            {
              <div>
                <Field
                  type="text"
                  id={placeholder}
                  name="name"
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ''}
                />
                <ErrMsg name="name" component="div" />
              </div>
            }
            <Button
              text={idItem ? 'Save' : 'Add'}
              image={AddIcon}
              type="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddItemForm;
