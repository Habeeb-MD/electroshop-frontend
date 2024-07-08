import axios from "axios";

const ORDERS_API_URL = "/api/orders";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${ORDERS_API_URL}/create-and-process-order`,
      orderData,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${ORDERS_API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${ORDERS_API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order details",
    );
  }
};
