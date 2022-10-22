import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SignForm.css';

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
    <div className="signform__container">
      <form
        className="signform__form"
        onSubmit={submitHandler}
        autoComplete={autocomplete}
      >
        <h1 className="signform__header">{header}</h1>
        <div className="signform__input">
          <label htmlFor="email">Email</label>
          <input
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
            id="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={passwordHandler}
          />
        </div>
        {err && <p className="sumbit__error">{errMsg}</p>}
        <button className="btn signform__submit" type="submit">
          {submitButton}
        </button>
        <p className="signform__link">
          {text} <Link to={href}> {link}</Link>
        </p>
      </form>
    </div>
  );
};

export default SignForm;
