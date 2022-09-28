import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import FloatingInput from "./floatingInput";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  initiateErrors = () => {
    return {};
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = this.initiateErrors();

    for (let item of error.details) {
      if (item.path.length > 1) {
        errors[item.path[0]][item.path[1]][item.path[2]] = item.message;
      } else {
        errors[item.path[0]] = item.message;
      }
    }

    // console.log("validate",errors);
    return errors;
  };

  validateProperty = ({ name, value }, fromAdditional = false) => {
    const obj = { [name]: value };
    if (!fromAdditional) {
      const { error } = Joi.object({
        [name]: this.schema[name],
      }).validate(obj);
      return error ? error.details[0].message : null;
    } else {
      // console.log("validateProperty", obj)
      const { error } = Joi.object({
        [name]: this.additionalSchema[name],
      }).validate(obj);
      return error ? error.details[0].message : null;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || { ...this.initiateErrors() } });
    if (errors) {
      // console.log("inside handle submit: ", errors);
      return;
    }
    // console.log("inside handle submit outside ", errors);
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const { arrayName, elementId } = input.dataset;

    if (arrayName) {
      const errorMessage = this.validateProperty(input, true);
      if (errorMessage) errors[arrayName][elementId][input.name] = errorMessage;
      else delete errors[arrayName][elementId][input.name];

      const element = { ...data[arrayName][elementId] };
      element[input.name] = input.value;
      data[arrayName][elementId] = element;
      this.setState({ data, errors });
    } else {
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      data[input.name] = input.value;
      this.setState({ data, errors });
    }
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderStyledButton(label, additionalClasses = "", callback = null) {
    return (
      <button
        disabled={this.validate()}
        className={`btn btn-primary ${additionalClasses}`}
      >
        <span className="me-2">{label}</span>
        {callback && callback()}
      </button>
    );
  }

  renderInput(name, label, type = "text", disabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  renderInputWithCustomError(
    name,
    label,
    customError,
    type = "text",
    disabled = false
  ) {
    const { data, errors } = this.state;
    const error = errors[name] ? customError : "";

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={error}
        disabled={disabled}
      />
    );
  }

  renderFloatingInput(name, label, type = "text", disabled = false) {
    const { data, errors } = this.state;

    return (
      <FloatingInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  renderSelect(name, label, options, callback = null) {
    const { data, errors } = this.state;
    if (callback === null) callback = this.handleChange;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={callback}
        error={errors[name]}
      />
    );
  }

  // updateState(state) {
  //     this.setState(state);
  // }
}

export default Form;
