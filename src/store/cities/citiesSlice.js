import { createSlice } from '@reduxjs/toolkit';
import { fetchCitiesOperation } from './operations';

const initialState = {cities: []};

const citiesSlice = createSlice(
    {
        name: 'cities',
        initialState,
        extraReducers: {
            [fetchCitiesOperation.fulfilled](state, { payload }) {

                state.cities = payload.map((city) => { 
                    return {...city, relation: "cities"}
                })
            }
        }
    })

export const citiesReducer = citiesSlice.reducer
export const getCities = state => state.cities.cities
    
       
