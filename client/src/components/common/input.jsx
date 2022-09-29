import React from "react";

const Input = ({ name, label, error, id, ...rest }) => {
  const inputClasses = error ? "form-control is-invalid" : "form-control";

  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      {/* <input {...rest} name={name} id={name} className="form-control" /> */}
      {id !== null && id !== undefined && (
        <input {...rest} name={name} id={id} className={inputClasses} />
      )}
      {(id === null || id === undefined) && (
        <input {...rest} name={name} id={name} className={inputClasses} />
      )}
      {error && <div className="invalid-feedback"></div>}
    </div>
  );
};

export default Input;
