import { React, useState, useEffesct, Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class VerifierRequestTable extends Component {
  columns = [
    { path: "verifier_name", label: "Verifier Name" },
    { path: "verifier_email", label: "Verifier Email" },
    {
      key: "Actions",
      content: ({ verifier_id }) => (
        <div className="d-flex flex-column flex-lg-row mb-3">
          <span className="me-2 my-2 my-lg-0">
            <Link to={`/verifier/${verifier_id}/`}>
              <button className="btn btn-success btn-sm hover-focus">
                <span className="me-2">View Verifier</span>
                <i className="fa fa-eye"></i>
              </button>
            </Link>
          </span>
          <span className="me-2 my-2 my-lg-0">
            <button
              className="btn btn-warning btn-sm hover-focus"
              onClick={() => this.props.acceptRequest(verifier_id)}
            >
              <span className="me-2">Accept Request</span>
              <i className="fa fa-check"></i>
            </button>
          </span>
          <span className="me-2 my-2 my-lg-0">
            <button
              className="btn btn-danger btn-sm hover-focus"
              onClick={() => this.props.rejectRequest(verifier_id)}
            >
              <span className="me-2">Reject Request</span>
              <i className="fa fa-trash-o"></i>
            </button>
          </span>
        </div>
      ),
      label: "Actions",
    },
  ];

  render() {
    const { verifierRequests } = this.props;

    return (
      <div className="pb-5">
        <div className="container div-dark">
          <h3 className="mb-4 d-flex justify-content-center">
            {" "}
            Veifier Requests{" "}
          </h3>
          <div className="mt-5 d-flex justify-content-center">
            <Table columns={this.columns} data={verifierRequests} />
          </div>
        </div>
      </div>
    );
  }
}

export default VerifierRequestTable;
