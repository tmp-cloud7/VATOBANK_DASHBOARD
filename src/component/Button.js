import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-300 rounded-[10px] outline-none ${styles}`}>
    Get Started
  </button>
);

export default Button;