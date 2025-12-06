import api from './api';

export const userService = {
  getAllUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`)
};
