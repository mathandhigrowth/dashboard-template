import api from "./api";

const baseURL = `/contacts`;

export const getContacts = () => {
    return api.get(`${baseURL}`);
}

export const deleteContact = (contact) => {
    return api.delete(`${baseURL}/${contact._id}`);
}

