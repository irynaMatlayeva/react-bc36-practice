import { Notify } from 'notiflix';

const { createSlice } = require('@reduxjs/toolkit');
const {
  fetchDepartmentsOperation,
  createDepartmentsOperation,
  deleteDepartmentsOperation,
} = require('./operations');

const initialState = {
  departments: [],
};

const convertToFrontDepartment = ({ id, name }) => {
  return {
    id,
    text: name,
    relation: 'departments',
  };
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchDepartmentsOperation.fulfilled, (state, { payload }) => {
        state.departments = payload.map(convertToFrontDepartment);
      })
      .addCase(createDepartmentsOperation.fulfilled, (state, { payload }) => {
        const department = convertToFrontDepartment(payload);
        if (
          state.departments.some(dep => dep.text.toLowerCase() === department.text.toLowerCase())
        ) {
          Notify.warning(`${department.text} already exists`);
          return state;
        } else {
          Notify.success(`Додали депертмент (${department.text})`);
          state.departments.unshift(department);
        }
      })
      .addCase(deleteDepartmentsOperation.fulfilled, (state, { payload: { id, name } }) => {
        Notify.success(`Видалили депертмент (${name})`);
        state.departments = state.departments.filter(dep => dep.id !== id);
      });
  },
});

export const departmentsReducer = departmentsSlice.reducer;
