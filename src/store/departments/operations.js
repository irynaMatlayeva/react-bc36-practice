import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDepartment,
  deleteDepartment,
  fetchDepartments,
  updateDepartment,
} from '../../API/departmentsAPI/departmentsAPI';

export const fetchDepartmentsOperation = createAsyncThunk(
  'departments/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchDepartments();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createDepartmentsOperation = createAsyncThunk(
  'departments/add',
  async (departmentName, thunkAPI) => {
    try {
      const { data } = await createDepartment({ name: departmentName });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDepartmentsOperation = createAsyncThunk(
  'departments/delete',
  async (departmentId, thunkAPI) => {
    try {
      const { data } = await deleteDepartment(departmentId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editDepartmentsOperation = createAsyncThunk(
  'departments/edit',
  async (data, thunkAPI) => {
    try {
      const { id, text } = data;
      const responce = await updateDepartment(id, { id, name: text });
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
