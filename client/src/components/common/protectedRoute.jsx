import React, { Component } from "react";
import { Route, Navigate, useParams } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ permissions, children }) => {
  const currentUser = auth.getCurrentUser();
  // console.log("currentUser: ", currentUser);
  if (currentUser) {
    if (!permissions) return children;
    else if (permissions.includes(currentUser.role)) return children;
    else {
      return (
        <Navigate
          replace
          to={{
            pathname: "/not-found",
            // state: { from: children.location }
          }}
        />
      );
    }
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          // state: { from: children.location }
        }}
      />
    );
  }
};

export default ProtectedRoute;
