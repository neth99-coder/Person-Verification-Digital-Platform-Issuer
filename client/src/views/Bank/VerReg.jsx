import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Axios from "axios";

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

import bg2 from "../../assets/images/Tiny cartoon business people reading legal document.jpg";
import bg3 from "../../assets/images/5869.jpg";

function VerReg() {
  const [bank, setBank] = useState({
    name: "",
    cc_photo_id: "",
    email: "",
    password: "XXXXX",
    address: "",
    contact_number: "",
    role: "bank",
    isAccepted: "0",
  });

  const [validated, setValidated] = useState(false); //form validation
  //const navigate = useNavigate();
  const [account, setAccount] = useState(false);
  const [loan, setLoan] = useState(false);
  const [card, setCard] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "name") {
      setBank((prev_val) => {
        return { ...prev_val, name: value };
      });
    } else if (name === "contact_number") {
      setBank((prev_val) => {
        return { ...prev_val, contact_number: value };
      });
    } else if (name === "address") {
      setBank((prev_val) => {
        return { ...prev_val, address: value };
      });
    } else if (name === "email") {
      setBank((prev_val) => {
        return { ...prev_val, email: value };
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      setValidated(true);
      e.stopPropagation();
    }
    else{
      setValidated(true);
      //console.log(person)
  
      const formData = new FormData();
      
  
      formData.append("name", bank.name);
      formData.append("cc_photo_id", bank.cc_photo_id);
      formData.append("email", bank.email);
      formData.append("password", bank.password);
      formData.append("address", bank.address);
      formData.append("contact_number", bank.contact_number);
      formData.append("role", bank.role);
      formData.append("isAccepted", bank.isAccepted);
      formData.append("account", account);
      formData.append('loan', loan);
      formData.append('card', card);
  
      Axios.post("http://localhost:3001/api/v1/user/addUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'x-auth-token': authService.getUserToken(),
        },
      }).then((res) => {
        if (!res.data.success) {
          // console.log(res.data.error)
          alert("Error occured !!");
        } else {
          // console.log("success");
          //navigate("/");
          window.location.href = '/'
        }
      });  
    }
   
  }
  return (
    <MDBContainer fluid>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
                    style={{ display: "inline-block", width: "25vw", minWidth: "200px" }}
                    name="name"
                    onChange={handleChange}
                    value={bank.first_name}
                    minLength = '2'
                    maxLength= '50'
                    required
                  />
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Type of Organization"
                    id="form2"
                    type="text"
                    style={{ width: "250px" }}
                  />
                </div> */}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Address"
                    id="form3"
                    type="text"
                    style={{ display: "inline-block", width: "25vw", minWidth: "200px"}}
                    name="address"
                    onChange={handleChange}
                    value={bank.address}
                    required
                    minLength='5'
                    maxLength='1024'
                  />
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Postal Code"
                    id="form4"
                    type="text"
                    style={{ width: "250px" }}
                  />
                </div> */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Contact Number"
                    id="form5"
                    type="text"
                    style={{ display: "inline-block", width: "25vw", minWidth: "200px" }}
                    name="contact_number"
                    onChange={handleChange}
                    value={bank.contact_number}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="E-mail"
                    id="form6"
                    type="email"
                    style={{ display: "inline-block", width: "25vw", minWidth: "200px" }}
                    name="email"
                    onChange={handleChange}
                    value={bank.email}
                    required
                    minLength='5'
                    maxLength='255'
                  />
                </div>

                <button
                  type="button"
                  class="btn btn-warning ms-2"
                  onClick={() => {
                    document.querySelector(".firstPage").style.display = "none";
                    document.querySelector(".secondPage").style.display =
                      "block";
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
                      id="0"
                      name="ch1"
                      style={{ float: "right" }}
                      onChange={(e) => {
                        setAccount(!account);
            
                        //console.log(services)
                      }}
                    />
                    <label class="form-check-label" for="ch1">
                      Bank Account Creation
                    </label>
                  </div>
                  <div class="form-check d-flex justify-content-left mb-3">
                    <input
                      type="checkbox"
                      id="1"
                      name="ch2"
                      style={{ float: "right" }}
                      onChange={(e) => {
                        setLoan(!loan);
                        //console.log(services)
                      }}
                    />
                    <label class="form-check-label" for="ch2">
                      Bank Loan Services
                    </label>
                  </div>
                  <div class="form-check d-flex justify-content-left mb-3">
                    <input
                      type="checkbox"
                      id="2"
                      name="ch3"
                      style={{ float: "right" }}
                      onChange={(e) => {
                        setCard(!card);
                        //console.log(services)
                      }}
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
                    style={{display: "inline-block", width: "25vw", minWidth: "200px" }}
                    name="cc_photo_id"
                    onChange={(e) => {
                      setBank((prev_val) => {
                        return { ...prev_val, cc_photo_id: e.target.files[0] };
                      });
                    }}
                    required
                  />
                  <p style={{ color: "blue" }}>
                    upload proof of company registration
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    class="btn btn-warning ms-2"
                    onClick={() => {
                      document.querySelector(".firstPage").style.display =
                        "block";
                      document.querySelector(".secondPage").style.display =
                        "none";
                    }}
                  >
                    Prev Page
                  </button>
                  <button type="submit" class="btn btn-primary ms-2">
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
      </Form>
    </MDBContainer>
  );
}

export default VerReg;
