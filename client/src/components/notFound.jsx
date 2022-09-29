import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mb-5">
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-danger">404!</h1>
          <p className="fs-3">Opps! Page not found.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
