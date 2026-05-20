const API_URL = import.meta.env.VITE_API_URL || '/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('snaplink_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || 'Something went wrong', response.status);
  }

  return data;
}

export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  profile: () => request('/auth/profile'),
};

export const urlsApi = {
  create: (originalUrl) =>
    request('/urls', { method: 'POST', body: JSON.stringify({ originalUrl }) }),
  list: (search = '') => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/urls${params}`);
  },
  getById: (id) => request(`/urls/${id}`),
  delete: (id) => request(`/urls/${id}`, { method: 'DELETE' }),
};

export const analyticsApi = {
  get: (shortCode) => request(`/analytics/${shortCode}`),
};

export { ApiError };
