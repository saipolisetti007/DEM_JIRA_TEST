import { performApiRequest } from "../utils/apiUtils";

export const getHealth = async () => {
  try {
    return await performApiRequest("/health-check");
    // return await performApiRequest("/users");
  } catch (error) {
    throw error;
  }
};
