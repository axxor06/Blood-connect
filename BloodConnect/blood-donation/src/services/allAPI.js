import apiService from "../api/apiServices";

// ---------- users (sign up / sign in / profile) ----------
export const saveUserAPI = async (userDetails) => await apiService('POST', "/users", userDetails);
export const viewUserAPI = async (userId) => await apiService('GET', `/users/${userId}`, {});
export const allUsersAPI = async () => await apiService('GET', `/users`, {});
export const updateUserAPI = async (userId, userDetails) => await apiService('PUT', `/users/${userId}`, userDetails);
export const deleteUserAPI = async (userId) => await apiService('DELETE', `/users/${userId}`, {});

// ---------- donors ----------
export const saveDonorAPI = async (donorDetails) => await apiService('POST', "/donors", donorDetails);
export const viewDonorAPI = async (donorId) => await apiService('GET', `/donors/${donorId}`, {});
export const allDonorsAPI = async () => await apiService('GET', `/donors`, {});
export const updateDonorAPI = async (donorId, donorDetails) => await apiService('PUT', `/donors/${donorId}`, donorDetails);
export const deleteDonorAPI = async (donorId) => await apiService('DELETE', `/donors/${donorId}`, {});

// ---------- receivers ----------
export const saveReceiverAPI = async (receiverDetails) => await apiService('POST', "/receivers", receiverDetails);
export const viewReceiverAPI = async (receiverId) => await apiService('GET', `/receivers/${receiverId}`, {});
export const allReceiversAPI = async () => await apiService('GET', `/receivers`, {});
export const updateReceiverAPI = async (receiverId, receiverDetails) => await apiService('PUT', `/receivers/${receiverId}`, receiverDetails);
export const deleteReceiverAPI = async (receiverId) => await apiService('DELETE', `/receivers/${receiverId}`, {});

// ---------- blood requests ----------
export const saveRequestAPI = async (requestDetails) => await apiService('POST', "/requests", requestDetails);
export const viewRequestAPI = async (requestId) => await apiService('GET', `/requests/${requestId}`, {});
export const allRequestsAPI = async () => await apiService('GET', `/requests`, {});
export const updateRequestAPI = async (requestId, requestDetails) => await apiService('PUT', `/requests/${requestId}`, requestDetails);
export const deleteRequestAPI = async (requestId) => await apiService('DELETE', `/requests/${requestId}`, {});
