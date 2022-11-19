import React, { Component } from "react";
import { Navigate, useNavigate, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { BsWindowSidebar } from "react-icons/bs";
import { toast } from "react-toastify";

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
        console.log("navigation");
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
        toast.error("Email or Password Invalid", { theme: "dark" });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to="/" />;

    return (
      <div className="container  h-100 py-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
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
