import { combineReducers } from 'redux';
import tutorsReducer from './tutors/reducer';
import { citiesReducer } from './cities/citiesSlice';
import { departmentsReducer } from './departments/departmentsSlice';

export default combineReducers({
  tutors: tutorsReducer,
  departments: departmentsReducer,
  cities: citiesReducer,
});
