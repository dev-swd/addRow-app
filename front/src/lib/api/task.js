import client from './client';

// 一覧
export const getTasks = () => {
  return client.get('/tasks');
};

// 詳細
export const getTask = (id) => {
  return client.get(`/tasks/${id}`);
};

// 新規作成
export const createTask = (params) => {
  return client.post('/tasks', params);
};

// 更新
export const updateTask = (id, params) => {
  return client.patch(`/tasks/${id}`, params);
};

// 削除
export const deleteTask = (id) => {
  return client.delete(`/tasks/${id}`);
};
