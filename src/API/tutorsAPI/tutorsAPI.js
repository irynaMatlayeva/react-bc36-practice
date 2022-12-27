import { deleteData, fetchData, postData, URL } from 'API/defaultAPI';

export const fetchTutors = () => {
  return fetchData(URL.TUTORS);
};
export const createTutor = data => {
  return postData(URL.TUTORS, data);
};
export const deleteTutor = id => {
  return deleteData(`${URL.TUTORS}/${id}`);
};
