import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  const inputClasses = error ? "form-control is-invalid" : "form-control";

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className={inputClasses} name={name} id={name} {...rest}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
