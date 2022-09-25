import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

import bankimg from "../../assets/images/bank.jpg";

export default function VerReqCard() {
  return (
    <div className="reqCard m-2">
      <MDBCard style={{ borderRadius: "15px" }}>
        <MDBCardBody className="text-center">
          <div className="mt-3 mb-4">
            <MDBCardImage
              src={bankimg}
              className="rounded-circle"
              fluid
              style={{ width: "100px" }}
            />
          </div>
          <MDBTypography tag="h4">Julie L. Arsenault</MDBTypography>
          <MDBCardText className="text-muted mb-4">verifier</MDBCardText>

          <MDBBtn
            rounded
            size="lg"
            onClick={() => {
              window.location.href = "/verreq";
            }}
          >
            view
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
