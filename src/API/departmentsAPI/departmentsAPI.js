import { deleteData, fetchData, postData, updateData, URL } from 'API/defaultAPI';

export const fetchDepartments = () => {
  return fetchData(URL.DEPARTMENTS);
};
export const deleteDepartment = id => {
  return deleteData(`${URL.DEPARTMENTS}/${id}`);
};
export const updateDepartment = (id, data) => {
  return updateData(`${URL.DEPARTMENTS}/${id}`, data);
};
export const createDepartment = data => {
  return postData(URL.DEPARTMENTS, data);
};
