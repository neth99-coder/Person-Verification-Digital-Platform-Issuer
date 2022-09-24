import React, { Component } from "react";
import { getUserRequests, acceptRequest } from "../../services/userService";
import UserRequestTable from "./userRequestTable";
import { toast } from "react-toastify";

class UserRequests extends Component {
  state = {
    userRequests: [],
  };

  async componentDidMount() {
    const { data: userRequests } = await getUserRequests();
    this.setState({ userRequests: userRequests });
  }

  handleAcceptRequest = async (userId) => {
    const userRequests = [...this.state.userRequests];
    const copyUserRequests = [...userRequests];

    for (let i = 0; i < userRequests.length; ++i) {
      if (userRequests[i].user_id === userId) {
        userRequests.splice(i, 1);
        break;
      }
    }
    this.setState({ userRequests });

    try {
      await acceptRequest(userId);
      toast.success("Request accepted", { theme: "dark" });
    } catch (e) {
      toast.error("Could not accept the request", { theme: "dark" });
      this.setState({ userRequests: copyUserRequests });
    }
  };

  handleRejectRequest = async (userId) => {
    const userRequests = [...this.state.userRequests];
    const copyUserRequests = [...userRequests];

    for (let i = 0; i < userRequests.length; ++i) {
      if (userRequests[i].user_id === userId) {
        userRequests.splice(i, 1);
        break;
      }
    }
    this.setState({ userRequests });

    try {
      // await rejctRequest(userId);
      toast.success("Request rejected", { theme: "dark" });
    } catch (e) {
      toast.error("Could not reject the request", { theme: "dark" });
      this.setState({ userRequests: copyUserRequests });
    }
  };

  render() {
    const { length: count } = this.state.userRequests;
    if (count === 0) return <p>There are no user requests.</p>;
    return (
      <div className="container-fluid mb-5">
        <UserRequestTable
          userRequests={this.state.userRequests}
          rejectRequest={this.handleRejectRequest}
          acceptRequest={this.handleAcceptRequest}
        />
      </div>
    );
  }
}

export default UserRequests;
