import {BASE_URL} from '@store/config';
import axios from 'axios';

export const looginOrSignup = async (phone: string, address: string) => {
  try {
    console.log(phone, address);

    const res = await axios.post(`${BASE_URL}/user/login`, {phone, address});
    console.log('Login  ', res);

    return res.data.user;
  } catch (error) {
    console.log('Login or Signup error', error);
    return null;
  }
};

export const getOrderByUserId = async (usrId: string) => {
  try {
    console.log('userId', usrId);
    const res = await axios.get(`${BASE_URL}/order/${usrId}`);
    console.log('here', res);
    return res.data.orders;
  } catch (error) {
    console.log('Order error', error);
    return [];
  }
};
