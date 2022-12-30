import * as types from './actionTypes';

const initialState = [];

const tutorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_TUTORS:
      return action.payload;

    case types.CREATE_TUTOR:
      return [...state, action.payload];

    case types.DELETE_TUTOR:
      return state.filter(tutor => tutor.id !== action.payload);

    default:
      return state;
  }
};

export default tutorsReducer;
