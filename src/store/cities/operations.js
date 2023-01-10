import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCity,
  deleteCity,
  fetchCities,
  updateCity,
} from '../../API/citiesAPI/citiesAPI';

export const fetchCitiesOperation = createAsyncThunk(
  'cities/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchCities();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCitiesOperation = createAsyncThunk(
  'cities/addCity',
  async (cityName, thunkAPI) => {
    try {
      const { data } = await createCity({ text: cityName });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCitiesOperation = createAsyncThunk(
  'cities/deleteCity',
  async (cityId, thunkAPI) => {
    try {
      const { data } = await deleteCity(cityId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCitiesOperation = createAsyncThunk(
  'cities/editCity',
  async (data, thunkAPI) => {
    try {
      const { id, name } = data;
      const responce = await updateCity(id, { id, text: name });
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
