import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

// thunk untuk register
export const registerAuth = createAsyncThunk("auth/register", async ({ email, first_name, last_name, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration`, { email, first_name, last_name, password });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Terjadi kesalahan");
  }
});

// thunk untuk login
export const loginAuth = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    const token = response.data.data.token;

    // simpan token ke localStorage
    localStorage.setItem("token", token);

    // kirim token ke reducer
    return { token, user: response.data.data.user };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Terjadi kesalahan");
  }
});

// yhunk untuk mendapatkan service
export const getService = createAsyncThunk("service/getService", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal mendapatkan service");
  }
});

// thunk untuk mendapatkan banner
export const getBanner = createAsyncThunk("banner/getBanner", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/banner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal mendapatkan banner");
  }
});

// thunk untuk top up
export const topUp = createAsyncThunk("topup/topUp", async (top_up_amount, { rejectWithValue }) => {
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
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal top up");
  }
});

// thunk untuk payment
export const payment = createAsyncThunk("payment/payment", async ({ service_code, total_amount }, { rejectWithValue }) => {
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
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal melakukan transaksi");
  }
});

// thunk untuk mendapatkan saldo
export const getSaldo = createAsyncThunk("getSaldo/getSaldo", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal mendapatkan saldo");
  }
});

// thunk transaksi
export const getTransaction = createAsyncThunk("getTransaction/getTransaction", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal mendapatkan transaksi");
  }
});

// thunk profile
export const getProfile = createAsyncThunk("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return rejectWithValue(error.response?.data?.message || "Gagal mendapatkan profile");
  }
});

// thunk update profile
export const updateProfile = createAsyncThunk("profile/updateProfile", async ({ first_name, last_name }, { rejectWithValue }) => {
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
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal update profile");
  }
});

// thunk update profile image
export const updateProfileImage = createAsyncThunk("profile/updateProfileImage", async (file, { rejectWithValue }) => {
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
    if (error.response.status === 401) localStorage.removeItem("token");
    return rejectWithValue(error.response?.data?.message || "Gagal update profile image");
  }
});
