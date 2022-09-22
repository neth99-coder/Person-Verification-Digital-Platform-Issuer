import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import bg2 from "../images/Tiny cartoon business people reading legal document.jpg";
import bg3 from "../images/5869.jpg";

function VerReg() {
  return (
    <MDBContainer fluid>
      <MDBCard
        className="text-black m-5 firstPage"
        style={{ borderRadius: "25px" }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <h2
                classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                style={{ color: "blue" }}
              >
                Register as a Verifier
              </h2>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBInput
                  label="Name of Organization"
                  id="form1"
                  type="text"
                  style={{ width: "250px" }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput
                  label="Type of Organization"
                  id="form2"
                  type="text"
                  style={{ width: "250px" }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput
                  label="Address"
                  id="form3"
                  type="text"
                  style={{ width: "250px" }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput
                  label="Postal Code"
                  id="form4"
                  type="text"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput
                  label="Contact Number"
                  id="form5"
                  type="text"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput
                  label="E-mail"
                  id="form6"
                  type="email"
                  style={{ width: "250px" }}
                />
              </div>

              <button
                type="button"
                class="btn btn-warning btn-lg ms-2"
                onClick={() => {
                  document.querySelector(".firstPage").style.display = "none";
                  document.querySelector(".secondPage").style.display = "block";
                }}
              >
                Next Page
              </button>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={bg3} fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBCard
        className="text-black m-5 secondPage"
        style={{ borderRadius: "25px", display: "none" }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p
                classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                style={{ color: "red" }}
              >
                * Do not submit forged documents *
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <h5>Select required services</h5>

                <div class="form-check d-flex justify-content-left mb-3">
                  <input
                    type="checkbox"
                    id="ch1"
                    name="ch1"
                    style={{ float: "right" }}
                  />
                  <label class="form-check-label" for="ch1">
                    Bank Account Creation
                  </label>
                </div>
                <div class="form-check d-flex justify-content-left mb-3">
                  <input
                    type="checkbox"
                    id="ch2"
                    name="ch2"
                    style={{ float: "right" }}
                  />
                  <label class="form-check-label" for="ch2">
                    Bank Loan Services
                  </label>
                </div>
                <div class="form-check d-flex justify-content-left mb-3">
                  <input
                    type="checkbox"
                    id="ch3"
                    name="ch3"
                    style={{ float: "right" }}
                  />
                  <label class="form-check-label" for="ch3">
                    Credit Card Services
                  </label>
                </div>
              </div>

              <div className="d-flex flex-column align-items-center mb-4">
                <MDBInput
                  type="file"
                  class="form-control"
                  id="bankDoc"
                  style={{ width: "300px" }}
                />
                <p style={{color:"blue"}}>upload proof of company registration</p>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  type="button"
                  class="btn btn-warning btn-lg ms-2"
                  onClick={() => {
                    document.querySelector(".firstPage").style.display =
                      "block";
                    document.querySelector(".secondPage").style.display =
                      "none";
                  }}
                >
                  Prev Page
                </button>
                <button type="button" class="btn btn-primary btn-lg ms-2">
                  Submit
                </button>
              </div>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={bg2} fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default VerReg;
