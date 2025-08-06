import api from "./api";

const baseURL = `/bookings`;

export const getBookings = () => {
  return api.get(`${baseURL}`);
};

export const getBookingById = (id) => {
  return api.get(`${baseURL}/${id}`);
};

export const updateBooking = (id, data) => {
  return api.put(`${baseURL}/${id}`, data);
};

export const deleteBooking = (id) => {
  return api.delete(`${baseURL}/${id}`);
};
