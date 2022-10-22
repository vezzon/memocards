import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
  const { setToken, setUserId } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/refresh', { withCredentials: true });
    const token = response.data.token;
    const id = response.data.id;
    // console.log(response);
    setToken(() => token);
    setUserId(() => id);

    return token;
  };
  return refresh;
};

export default useRefreshToken;
