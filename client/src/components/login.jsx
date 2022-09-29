import React, { Component } from "react";
import { Navigate, useNavigate, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { BsWindowSidebar } from "react-icons/bs";

class LoginBody extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.loginUser(data.username, data.password);

      this.props.setUser(auth.getCurrentUser());
      let userRole = auth.getCurrentUser().role;
      console.log(userRole);
      if (userRole === "admin") {
        this.props.navigate("/issuer");
      }
      if (userRole === "wallet_owner") {
        this.props.navigate("/wallet_owner");
      }
      if (userRole === "bank") {
        this.props.navigate("/bank");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/" />;

    return (
      <div className="container w-50 mb-5">
        <div className=" p-5 div-dark align-items-center justify-content-center">
          <div>
            <h1 className="text-center">Login</h1>

            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const Login = (props) => {
  const navigate = useNavigate();
  return <LoginBody {...props} navigate={navigate} />;
};

export default Login;
