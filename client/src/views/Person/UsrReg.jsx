import React from "react";
import { Form } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
import bg1 from "../../assets/images/Data_security_05.jpg";
import bg2 from "../../assets/images/Tiny cartoon business people reading legal document.jpg";
import { HiHome } from "react-icons/fa";
import { Button } from "bootstrap";
import { useState } from "react";

function formatDate(n){
  if(n< 10){
      return "0" + n;
  }else{
      return n;
  }
}

function UsrReg() {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    status: "Married",
    nationality: "Sinhalese",
    nic: "",
    dob: "",
    nic_photo_id: "",
    bc_photo_id: "",
    email: "",
    // password: "XXXXX",
    address: "",
    contact_number: "",
    role: "wallet_owner",
    isAccepted: "0",
  });

  const [validated, setValidated] = useState(false); //form validation
  // const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "f_name") {
      setPerson((prev_val) => {
        return { ...prev_val, first_name: value };
      });
    } else if (name === "last_name") {
      setPerson((prev_val) => {
        return { ...prev_val, last_name: value };
      });
    } else if (name === "status") {
      setPerson((prev_val) => {
        return { ...prev_val, status: value };
      });
    } else if (name === "nationality") {
      setPerson((prev_val) => {
        return { ...prev_val, nationality: value };
      });
    } else if (name === "nic") {
      setPerson((prev_val) => {
        return { ...prev_val, nic: value };
      });
    } else if (name === "dob") {
      setPerson((prev_val) => {
        return { ...prev_val, dob: value };
      });
    } else if (name === "contact_number") {
      setPerson((prev_val) => {
        return { ...prev_val, contact_number: value };
      });
    } else if (name === "address") {
      setPerson((prev_val) => {
        return { ...prev_val, address: value };
      });
    } else if (name === "email") {
      setPerson((prev_val) => {
        return { ...prev_val, email: value };
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      console.log("Empty")
      setValidated(true);
      e.stopPropagation();
      
    }else{
      setValidated(true);
      //console.log(person)
  
      const formData = new FormData();
  
      formData.append("first_name", person.first_name);
      formData.append("last_name", person.last_name);
      formData.append("status", person.status);
      formData.append("nationality", person.nationality);
      formData.append("nic", person.nic);
      formData.append("dob", person.dob);
      formData.append("nic_photo_id", person.nic_photo_id);
      formData.append("bc_photo_id", person.bc_photo_id);
      formData.append("email", person.email);
      // formData.append("password", person.password);
      formData.append("address", person.address);
      formData.append("contact_number", person.contact_number);
      formData.append("role", person.role);
      formData.append("isAccepted", person.isAccepted);
  
      console.log(...formData);
  
      Axios.post("http://localhost:3001/api/v1/user/addUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'x-auth-token': authService.getUserToken(),
        },
      }).then((res) => {
        if (!res.data.success) {
          alert("Error occured !!");
        } else {
          //console.log("success");
          // navigate("/");
          window.location.href = '/'
        }
      });
    }
    
  }

  function goToNextPage(){
    document.querySelector(".firstPage").style.display = "none";
    document.querySelector(".secondPage").style.display =
      "block";
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
                  className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                  style={{ color: "blue", marginBottom: "20px" }}
                >
                  Register as a User
                </h2>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBInput
                    label="First Name"
                    id="form1"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="f_name"
                    onChange={handleChange}
                    value={person.first_name}
                    required
                    minLength='2'
                    maxLength='50'
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Last Name"
                    id="form2"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="last_name"
                    onChange={handleChange}
                    value={person.last_name}
                    required
                    minLength='2'
                    maxLength='50'
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                  >
                    <label className="mb-1">Marital Status</label>
                    <Form.Select
                      value={person.status}
                      onChange={handleChange}
                      name="status"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                  >
                    <label className="mb-1">Nationality</label>
                    <Form.Select
                      value={person.nationality}
                      onChange={handleChange}
                      name="nationality"
                    >
                      <option value="Sinhalese">Sinhalese</option>
                      <option value="Tamils">Tamil</option>
                      <option value="Moor">Moor</option>
                      <option value="Burgher">Burgher</option>
                      <option value="Malay">Malay</option>
                      <option value="Vedda">Vedda</option>
                    </Form.Select>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="NIC Number"
                    id="form3"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="nic"
                    onChange={handleChange}
                    value={person.nic}
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="DOB"
                    id="form4"
                    type="date"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="dob"
                    onChange={handleChange}
                    value={person.dob}
                    required
                    min={(new Date().getFullYear()-80)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                    max={(new Date().getFullYear()-16)+ "-" + formatDate(new Date().getMonth() +1) +"-" + formatDate(new Date().getDate())}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Phone Number"
                    id="form5"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="contact_number"
                    onChange={handleChange}
                    value={person.contact_number}
                    required
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-warning ms-2"
                  onClick={goToNextPage}
                >
                  Next Page
                </button>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src={bg1} fluid />
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
                  className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                  style={{ color: "red" }}
                >
                  * Do not submit forged documents *
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBInput
                    label="Address"
                    id="form6"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="address"
                    onChange={handleChange}
                    value={person.address}
                    required
                    minLength='5'
                    maxLength='1024'
                  />
                </div>

                <div className="d-flex flex-column align-items-center mb-4">
                  <MDBInput
                    type="file"
                    className="form-control"
                    id="customFile1"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="nic_photo_id"
                    onChange={(e) => {
                      setPerson((prev_val) => {
                        return { ...prev_val, nic_photo_id: e.target.files[0] };
                      });
                    }}
                    required
                  />
                  <p style={{ color: "blue" }}>upload copy of NIC</p>
                </div>

                <div className="d-flex flex-column align-items-center mb-4">
                  <MDBInput
                    type="file"
                    className="form-control"
                    id="customFile2"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="bc_photo_id"
                    onChange={(e) => {
                      setPerson((prev_val) => {
                        return { ...prev_val, bc_photo_id: e.target.files[0] };
                      });
                    }}
                    required
                  />
                  <p style={{ color: "blue" }}>upload Birth Certificate copy</p>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="email"
                    id="form7"
                    type="email"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="email"
                    onChange={handleChange}
                    value={person.email}
                    required
                    minLength='5'
                    maxLength='255'
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    className="btn btn-warning  ms-2"
                    onClick={() => {
                      document.querySelector(".firstPage").style.display =
                        "block";
                      document.querySelector(".secondPage").style.display =
                        "none";
                    }}
                  >
                    Prev Page
                  </button>
                  <button type="submit" className="btn btn-primary  ms-2">
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

export default UsrReg;
