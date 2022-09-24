import { React, useState, useEffesct, Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class UserRequestTable extends Component {
  columns = [
    { path: "user_name", label: "Email" },
    { path: "nic", label: "NIC" },
    {
      key: "Actions",
      content: ({ user_id }) => (
        <div className="d-flex flex-column flex-lg-row mb-3">
          <span className="me-2 my-2 my-lg-0">
            <Link to={`/user/${user_id}/`}>
              <button className="btn btn-success btn-sm hover-focus">
                <span className="me-2">View User</span>
                <i className="fa fa-eye"></i>
              </button>
            </Link>
          </span>
          <span className="me-2 my-2 my-lg-0">
            <button
              className="btn btn-warning btn-sm hover-focus"
              onClick={() => this.props.acceptRequest(user_id)}
            >
              <span className="me-2">Accept Request</span>
              <i className="fa fa-check"></i>
            </button>
          </span>
          <span className="me-2 my-2 my-lg-0">
            <button
              className="btn btn-danger btn-sm hover-focus"
              onClick={() => this.props.rejectRequest(user_id)}
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
    const { userRequests } = this.props;

    return (
      <div className="pb-5">
        <div className="container div-dark">
          <h3 className="mb-4 d-flex justify-content-center">User Requests</h3>
          <div className="mt-5 d-flex justify-content-center">
            <Table columns={this.columns} data={userRequests} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserRequestTable;
