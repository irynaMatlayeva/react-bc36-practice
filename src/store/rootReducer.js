import { combineReducers } from 'redux';
import tutorsReducer from './tutors/reducer';
import {citiesReducer} from './cities/citiesSlice';

export default combineReducers({
  tutors: tutorsReducer,
  departments: null,
  cities: citiesReducer,
});
