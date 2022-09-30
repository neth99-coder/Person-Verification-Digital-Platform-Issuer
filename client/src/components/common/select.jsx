import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  const inputClasses = error ? "form-control is-invalid" : "form-control";

  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <select className={inputClasses} name={name} id={name} {...rest}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
