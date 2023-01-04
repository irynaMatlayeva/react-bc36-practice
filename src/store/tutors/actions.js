import { createTutor, deleteTutor, fetchTutors } from 'API/tutorsAPI/tutorsAPI';
import * as types from './actionTypes';

export const loadTutorsAction = () => dispatch => {
  fetchTutors().then(res =>
    // console.log('res from actions', res)
    dispatch({
      type: types.LOAD_TUTORS,
      payload: res.data,
    })
  );
};

export const createTutorAction = data => dispatch => {
  createTutor(data).then(res => {
    if (res.data) {
      dispatch({
        type: types.CREATE_TUTOR,
        payload: res.data,
      });
    }
  });
};

export const deleteTutorAction = id => dispatch => {
  deleteTutor(id).then(res => {
    return dispatch({
      type: types.DELETE_TUTOR,
      payload: res.data.id,
    });
  });
};
