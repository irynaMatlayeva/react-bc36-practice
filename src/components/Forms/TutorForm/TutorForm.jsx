import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'components';
import { object, string, number, date, InferType } from 'yup';
import { ErrMsg } from './TutorForm.styled';

const schemaValidation = object({
  firstName: string().min(2, 'Повинно бути мінімум 2 символи').max(5).required(),
  lastName: string(),
  patronymic: string(),
  phone: string(),
  email: string(),
  city: string(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  patronymic: '',
  phone: '',
  email: '',
  city: '',
};
const formNames = {
  firstName: "Ім'я",
  lastName: 'Прізвище',
  patronymic: 'По батькові',
  phone: 'Телефон',
  email: 'Електронна пошта',
  city: 'Місто',
};

function TutorForm({ addTutor }) {
  const entries = Object.entries(formNames);
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    addTutor(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schemaValidation}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form>
          <div>
            <h3>Add Tutor</h3>
            {entries.map(([name, ukName]) => {
              return (
                <div key={name}>
                  <Field
                    type="text"
                    id={name}
                    name={name}
                    placeholder={ukName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[name] || ''}
                  />
                  <ErrMsg name={name} component="div" />
                </div>
              );
            })}
            <Button text="Add" type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TutorForm;
