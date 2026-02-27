import axios from "axios";

/*
  client/.env

  VITE_API_BASE_URL=http://localhost:5000/api
*/

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

/* =========================================
   UPLOAD & SCAN CARD
========================================= */

export const scanCard = async (file) => {
  try {
    const formData = new FormData();

    // ⚠️ IMPORTANT: backend expects "cardImage"
    formData.append("cardImage", file);

    const response = await API.post(
      "/cards/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data || response.data;
  } catch (error) {
    console.error("Scan API Error:", error?.response || error.message);

    throw new Error(
      error?.response?.data?.message ||
      "Failed to scan card. Please try again."
    );
  }
};