import { createSlice } from '@reduxjs/toolkit';
import Notiflix, { Notify } from 'notiflix';
import {
  createCitiesOperation,
  deleteCitiesOperation,
  editCitiesOperation,
  fetchCitiesOperation,
} from './operations';

const initialState = { cities: [] };

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  extraReducers: {
    [fetchCitiesOperation.fulfilled](state, { payload }) {
      state.cities = payload.map(city => {
        return { ...city, relation: 'cities' };
      });
    },
    [createCitiesOperation.fulfilled](state, { payload }) {
      //   if (
      //     state.city.some(
      //       city => city.text.toLowerCase() === payload.text.toLowerCase()
      //     )
      //   ) {
      //     return state.cities;
      //   }
      if (state.cities.some(city => city.text.toLowerCase() === payload.text.toLowerCase())) {
        Notify.warning(`${payload.text} already exists`);
        return state;
      } else {
        Notify.success(`Додали місто (${payload.text})`);
        state.cities.unshift(payload);
      }
    },
    // [createCitiesOperation.rejected](_, { payload }) {
    //   Notiflix.Notify.failure(`already exists`);
    // },
    [deleteCitiesOperation.fulfilled](state, { payload }) {
      state.cities = state.cities.filter(city => city.id !== payload.id);
    },
    [editCitiesOperation.fulfilled](state, { payload }) {
      state.cities = state.cities.map(city => (city.id === payload.id ? payload : city));
    },
  },
});

export const citiesReducer = citiesSlice.reducer;
export const getCities = state => state.cities.cities;
