import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const loginAuth = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.data.token);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

export const registerAuth = async (email, first_name, last_name, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration`, {
      email,
      first_name,
      last_name,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

export const topUp = async (top_up_amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/topup`,
      { top_up_amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    throw error;
  }
};

export const payment = async (service_code, total_amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/transaction`,
      { service_code, total_amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    window.location.href = "/login";
    throw error;
  }
};

export const getBanner = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    window.location.href = "/login";
    throw error;
  }
};

export const getService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    window.location.href = "/login";
    throw error;
  }
};

export const getTransaction = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    window.location.href = "/login";
    throw error;
  }
};

export const getSaldo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    window.location.href = "/login";
    throw error;
  }
};

export const updateProfile = async (first_name, last_name) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/profile/update`,
      { first_name, last_name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    throw error;
  }
};

export const updateProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.put(`${BASE_URL}/profile/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    if (error.response.status === 401) localStorage.removeItem("token");

    throw error;
  }
};
