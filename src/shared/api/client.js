const BASE_URL = import.meta.env.BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export const get = (endppoint) => apiClient(endpoint);

export const post = (endpoint, data) =>
  apiClient(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const del = (endpoint) =>
  apiClient(endpoint, {
    method: "DELETE",
  });
