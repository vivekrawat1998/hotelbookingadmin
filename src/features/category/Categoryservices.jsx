import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addCategory = async (categoryData) => {
  const response = await axios.post(`${base_url}/category/create`, categoryData);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await axios.get(`${base_url}/category/all`);
  return response.data;
};

export const getSingleCategory = async (id) => {
  const response = await axios.get(`${base_url}/category/single${id}`);
  return response.data;
};

export const updateCategory = async (categoryData) => {
  const response = await axios.put(`${base_url}/category/update/${categoryData.id}`, {
    name: categoryData.name,
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}/category/delete/${id}`);
  return response.data;
};

const categoryService = {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
