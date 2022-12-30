import { combineReducers } from 'redux';
import tutorsReducer from './tutors/reducer';

export default combineReducers({
  tutors: tutorsReducer,
  departments: null,
  cities: null,
});
