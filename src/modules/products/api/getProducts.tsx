import {BASE_URL} from '@store/config';
import axios from 'axios';

export const getProductsByCategory = async (id: string) => {
  try {
    console.log("id: ",id)
    const res = await axios.get(`${BASE_URL}/product/${id}`);
    return res.data.products;
  } catch (error) {
    return [];
  }
};
