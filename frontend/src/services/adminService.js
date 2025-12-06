// frontend/src/services/adminService.js
import api from './api';

export const adminService = {
  getAllUsers: () => api.get('/users'),              // backend UserController (ADMIN only)
  getManagers: () => api.get('/users?role=MANAGER'), // if you implemented role filter
  getVendors: () => api.get('/users?role=VENDOR'),   // optional
};
