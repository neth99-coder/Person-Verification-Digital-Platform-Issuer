import React from "react";

const FloatingInput = ({ name, label, error, ...rest }) => {
  const inputClasses = error ? "form-control is-invalid" : "form-control";

  return (
    <div className="form-group mb-3">
      <div className="form-floating">
        <input
          {...rest}
          name={name}
          id={name}
          className={inputClasses}
          placeholder={label}
        />
        <label htmlFor={name}>{label}</label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default FloatingInput;
