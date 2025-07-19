import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addRoom = async (roomData) => {
  const response = await axios.post(`${base_url}/room/create`, roomData);
  return response.data;
};

export const getAllRooms = async () => {
  const response = await axios.get(`${base_url}/room/all`);
  return response.data;
};

export const getSingleRoom = async (id) => {
  const response = await axios.get(`${base_url}/room/${id}`);
  return response.data;
};

export const updateRoom = async (roomData) => {
  const response = await axios.put(`${base_url}/room/update/${roomData.id}`, roomData);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await axios.delete(`${base_url}/room/delete/${id}`);
  return response.data;
};

const roomService = {
  addRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};

export default roomService;
