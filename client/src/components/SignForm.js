import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const SignForm = ({
  header,
  submitHandler,
  autocomplete,
  email,
  emailHandler,
  password,
  passwordHandler,
  submitButton,
  href,
  link,
  text,
  err,
  errMsg,
}) => {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col items-center  p-2">
      <form
        className="m-4 flex flex-col items-center rounded-md bg-slate-700/50 p-4"
        onSubmit={submitHandler}
        autoComplete={autocomplete}
      >
        <h1 className="p-2 text-xl font-bold">{header}</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            value={email}
            required
            onChange={emailHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            id="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={passwordHandler}
          />
        </div>
        {err && <p className="text-red-700">{errMsg}</p>}
        <Button type="submit" text={submitButton} />
        <p className="mt-4 block rounded-full bg-slate-700/75 py-1 px-4 text-center text-sm text-slate-300">
          {text}
          <span className="font-semibold text-white">
            <Link className="hover:text-emerald-500" to={href}>
              {' '}
              {link}
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignForm;
