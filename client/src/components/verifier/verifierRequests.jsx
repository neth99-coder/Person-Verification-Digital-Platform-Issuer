import React, { Component } from "react";
import { getVerifierRequests } from "../../services/verifierService";
import VerifierRequestTable from "./verifierRequestTable";
import { toast } from "react-toastify";

class VerifierRequests extends Component {
  state = { verifierRequests: [] };

  async componentDidMount() {
    const { data: verifierRequests } = await getVerifierRequests();
    this.setState({ verifierRequests: verifierRequests });
  }

  handleAcceptRequest = async (verifierId) => {
    const verifierRequests = [...this.state.verifierRequests];
    const copyverifierRequests = [...verifierRequests];

    for (let i = 0; i < verifierRequests.length; ++i) {
      if (verifierRequests[i].verifier_id === verifierId) {
        verifierRequests.splice(i, 1);
        break;
      }
    }
    this.setState({ verifierRequests });

    try {
      // await acceptRequest(verifierID);
    } catch (e) {
      toast.error("Could not accept the request", { theme: "dark" });
      this.setState({ verifierRequests: copyverifierRequests });
    }
  };

  handleRejectRequest = async (verifierId) => {
    const verifierRequests = [...this.state.verifierRequests];
    const copyverifierRequests = [...verifierRequests];

    for (let i = 0; i < verifierRequests.length; ++i) {
      if (verifierRequests[i].verifier_id === verifierId) {
        verifierRequests.splice(i, 1);
        break;
      }
    }
    this.setState({ verifierRequests });

    try {
      // await rejctRequest(verifierId);
    } catch (e) {
      toast.error("Could not reject the request", { theme: "dark" });
      this.setState({ verifierRequests: copyverifierRequests });
    }
  };

  render() {
    const { length: count } = this.state.verifierRequests;
    if (count === 0) return <p>There are no verifier requests.</p>;
    return (
      <div className="container-fluid mb-5">
        <VerifierRequestTable
          verifierRequests={this.state.verifierRequests}
          rejectRequest={this.handleRejectRequest}
          acceptRequest={this.handleAcceptRequest}
        />
      </div>
    );
  }
}

export default VerifierRequests;
