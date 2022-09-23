import React, { Component } from "react";
import Form from "./common/form";

class UserRegistration extends Form {
  state = {
    data: { username: "", password: "", confirmPassword: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).max(1024).required().label("password"),
  };
}
