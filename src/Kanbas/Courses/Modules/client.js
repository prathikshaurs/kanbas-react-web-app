import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = `http://localhost:4000/api`;
const COURSES_URL = `${API_BASE}/courses`;
const MODULES_URL = `${API_BASE}/modules`;

export const findModulesForCourse = async (courseId) => {
  console.log('FinModulereducer')
  const response = await axios.get(`${COURSES_URL}/${courseId}/modules`);
  return response.data;
}

export const createModule = async (courseId, newModule) => {
  const response = await axios.post(`${COURSES_URL}/${courseId}/modules`,
      newModule);
  return response.data;
}

export const addWeekToModule = async (courseId, newWeek) => {
  const response = await axios.post(`${COURSES_URL}/${courseId}/modules/weeks`,
      newWeek);
  return response.data;
}

export const deleteModuleFromDB = async (moduleId, index) => {
  const response = await axios.delete(`${MODULES_URL}/${moduleId}/${index}`);
  return response.data;
}

export const updateModule = async (moduleId, index, newWeek) => {
  const response = await axios.put(`${MODULES_URL}/${moduleId}/${index}`,
      newWeek);
  return response.data;
}