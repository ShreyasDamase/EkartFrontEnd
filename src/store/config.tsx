import {Platform} from 'react-native';
export const BASE_URL = Platform.OS === 'android'
?   'https://ekartbackendprivate-production.up.railway.app'
:  'http://192.168.0.177:4000'
