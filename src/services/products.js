import axios from "axios";

// const PRODUCTS_API_URL = "https://electroshop.hackquest.com/api/products";
const PRODUCTS_API_URL = "http://localhost:3001/api/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
// Add more API calls here as needed