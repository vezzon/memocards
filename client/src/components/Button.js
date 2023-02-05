import React from 'react';

const Button = ({ clickHandler, children }) => {
  return (
    <button
      onClick={clickHandler}
      className="m-4 cursor-pointer rounded-md bg-indigo-500 py-2 px-4 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none"
    >
      {children}
    </button>
  );
};

export default Button;
