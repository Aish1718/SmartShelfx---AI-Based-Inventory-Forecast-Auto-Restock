import api from './api';

export const alertService = {
  getAllAlerts: () => api.get('/alerts'),
  getUnreadAlerts: () => api.get('/alerts/unread'),
  getAlertsByType: (type) => api.get(`/alerts/type/${type}`),
  getAlertsBySeverity: (severity) => api.get(`/alerts/severity/${severity}`),
  getUnreadCount: () => api.get('/alerts/count/unread'),
  markAsRead: (id) => api.put(`/alerts/${id}/read`),
  dismissAlert: (id) => api.put(`/alerts/${id}/dismiss`),
  markAllAsRead: () => api.put('/alerts/read-all'),
  dismissAll: () => api.put('/alerts/dismiss-all'),
};