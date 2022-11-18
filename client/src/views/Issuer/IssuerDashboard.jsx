import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import bg from "../../assets/images/2154438.jpg";

function IssuerDashboard() {
  return (
    <MDBContainer
      fluid
      className="p-5 bg-gradient m-2"
      style={{ backgroundColor: "#022D36" }}
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column "
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Person Verification <br />
            <span className="text-primary">Digital Platform</span>
          </h1>

          <p
            className="px-3"
            style={{
              color: "hsl(217, 10%, 50.8%)",
              fontSize: "40px",
              color: "white",
              letterSpacing: "2px",
              fontFamily: "Sans-serif",
            }}
          >
            Own a trusted and secured, distributed digital identity and ensure
            full ownership of your privacy.
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5 pb-0">
              <MDBCard
                background="primary"
                className="text-white mb-6 hover-focus"
                role="button"
              >
                <MDBCardBody
                  onClick={() => {
                    window.location.href = "/issuer/id-requests";
                  }}
                >
                  <MDBCardTitle style={{ textAlign: "center" }}>
                    View ID Requests
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
              <MDBCard
                background="primary"
                className="text-white mb-6 hover-focus"
                role="button"
              >
                <MDBCardBody
                  onClick={() => {
                    window.location.href = "/issuer/ver-requests";
                  }}
                >
                  <MDBCardTitle style={{ textAlign: "center" }}>
                    View Verifier Requests
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default IssuerDashboard;
