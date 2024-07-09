import { apiClient } from "@/lib/ApiClient";

export const getAllProduct = async () => {
  try {
    const response = await apiClient.get("/products");

    console.log("check the response over here first", response);

    return response.data;
  } catch (error) {
    return error;
  }
};
