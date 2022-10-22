import { useState } from 'react';
import SignForm from '../SignForm';
import axios from '../../api/axios';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const submitHandler = async event => {
    event.preventDefault();

    const emailValidation = EMAIL_REGEX.test(email);
    if (!emailValidation) {
      setErr(true);
      setErrMsg('Invalid email format');
      return;
    }

    if (password.length < 15) {
      setErr(true);
      setErrMsg('Password has to be at least 15 characters');
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post('/users/signup', userData);
      // console.log(res);

      if (res.status === 201) {
        setNavigate(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErr(true);
        setErrMsg(error.response.data.message);
      }
      console.log(error.response.data);
    }
  };

  const emailHandler = event => {
    setEmail(event.target.value);
    setErr(false);
  };

  const passwordHandler = event => {
    setPassword(event.target.value);
    setErr(false);
  };

  if (navigate) {
    return <Navigate to={'/login'} />;
  }

  return (
    <SignForm
      err={err}
      errMsg={errMsg}
      header={'Signup'}
      autocomplete={'off'}
      submitHandler={submitHandler}
      email={email}
      emailHandler={emailHandler}
      password={password}
      passwordHandler={passwordHandler}
      submitButton={'Signup'}
      href={'/login'}
      text={'Already a member?'}
      link={'Login!'}
    />
  );
};

export default Signup;
