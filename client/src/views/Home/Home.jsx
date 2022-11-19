import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBTypography,
  MDBCardText,
} from "mdb-react-ui-kit";

import logo from "../../assets/images/logo.png";

function Home(props) {
  return (
    <MDBContainer fluid className="p-3">
      <MDBRow
        className="bg-gradient text-white p-5 m-2"
        style={{ backgroundColor: "#022D36" }}
      >
        <MDBCol
          md="9"
          className="d-flex align-items-center justify-content-center"
        >
          <h1
            style={{
              fontSize: "8vw",
              color: "white",
              fontFamily: "cursive",
            }}
          >
            Get Your Own Digital Identity
          </h1>
        </MDBCol>
        <MDBCol
          md="3"
          className="d-flex align-items-center justify-content-center"
        >
          <MDBCardImage
            src={logo}
            alt=""
            className=""
            fluid
            style={{ width: "" }}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol
          style={{ backgroundColor: "#241571", "border-radius": "10px" }}
          className="mx-4 hover-focus my-1"
        >
          <a className="text-decoration-none" href="/register-user">
            <MDBCardBody>
              <div className="mt-3 mb-4 d-flex justify-content-center">
                <MDBCardImage
                  src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
                  alt=""
                  className="rounded-circle"
                  fluid
                  style={{ width: "100px" }}
                />
              </div>

              <MDBCardText
                className=" mb-4 d-flex justify-content-center font-weight-bold"
                style={{ color: "white" }}
              >
                REGISTER AS USER
              </MDBCardText>
            </MDBCardBody>
          </a>
        </MDBCol>

        <MDBCol
          style={{ backgroundColor: "#241571", "border-radius": "10px" }}
          className="mx-4 hover-focus my-1"
        >
          <a className="text-decoration-none" href="/register-veri">
            <MDBCardBody>
              <div className="mt-3 mb-4 d-flex justify-content-center">
                <MDBCardImage
                  src="https://img.freepik.com/free-vector/payment-card-electronic-funds-transfer-colorful-cartoon-characters-holding-plastic-credit-card-banking-credit-deposit-contactless-payment-system_335657-842.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
                  alt=""
                  className="rounded-circle"
                  fluid
                  style={{ width: "100px" }}
                />
              </div>

              <MDBCardText
                className=" mb-4 d-flex justify-content-center font-weight-bold"
                style={{ color: "white" }}
              >
                REGISTER AS VERIFIER
              </MDBCardText>
            </MDBCardBody>
          </a>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Home;
