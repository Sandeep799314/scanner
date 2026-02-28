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
   UPLOAD & SCAN MULTIPLE CARDS
========================================= */

export const scanCard = async (formData) => {
  try {
    /*
      IMPORTANT:
      CardScanner.jsx must send:

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("cards", image);
      });
    */

    const response = await API.post(
      "/cards/upload",   // ✅ matches backend route
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Scan API Error:",
      error?.response || error.message
    );

    throw new Error(
      error?.response?.data?.message ||
      "Failed to scan cards. Please try again."
    );
  }
};