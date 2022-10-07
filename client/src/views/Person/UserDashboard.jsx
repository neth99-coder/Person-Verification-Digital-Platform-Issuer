import { React, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import authService from "../../services/authService";

import bg from "../../assets/images/2154438.jpg";

function UserDashboard() {
  const [basicModal, setBasicModal] = useState(false);
  const [user_profile, setUserProfile] = useState([]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [PasswordBox, setPasswordBox] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const togglePasswordBox = () => setPasswordBox(!PasswordBox);

  let User;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      alert("Please fill all the fields");
    } else if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
    } else if (newPassword === oldPassword) {
      alert("New Password cannot be same as Old Password");
    } else if (!checkPassword(newPassword)) {
      alert(
        "password must contain atleast one uppercase, one lowercase, one number and one special character and length must be less than 8"
      );
    } else {
      axios
        .post("http://localhost:3001/api/v1/user/updatePassword", {
          email: user_profile.email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
        .then((res) => {
          if (res.data.message) {
            alert("password incorrect!!");
          } else if (!res.data.success) {
            alert("error");
          } else if (res.data.success) {
            alert("success");
            window.location.reload(false);
          }
        });
    }
  };

  //TODO
  //get email from token
  let { email } = authService.getCurrentUser();
  useEffect(() => {
    // setUserEmail(email);
    // const user_email = email;

    function getUser() {
      axios
        .get("http://localhost:3001/api/v1/user/getUser", {
          params: {
            email: email,
          },
        })
        .then((res) => {
          setUserProfile(res.data);
        });
    }
    getUser();
  }, []);

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column "
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Person Verification <br />
            <span className="text-primary">Digital Platform</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5 pb-0">
              <MDBCard
                background="primary"
                className="text-white mb-6 hover-focus"
              >
                <MDBCardBody onClick={toggleShow}>
                  <MDBCardTitle style={{ textAlign: "center" }}>
                    View Profile
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
              <MDBCard
                background="primary"
                className="text-white mb-6 hover-focus"
              >
                <MDBCardBody
                  onClick={() => {
                    window.location.href = "/qr";
                  }}
                >
                  <MDBCardTitle style={{ textAlign: "center" }}>
                    Generate ID
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Profile Info</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted ">
                        {user_profile.first_name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted ">
                        {user_profile.last_name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>NIC Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_profile.nic}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>DOB</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_profile.dob}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_profile.contact_number}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_profile.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_profile.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  toggleShow();
                  togglePasswordBox();
                }}
              >
                Change Password
              </MDBBtn>
              <MDBBtn color="secondary" onClick={togglePasswordBox}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={PasswordBox} setShow={setPasswordBox} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Change Password</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  togglePasswordBox();
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Old Password"
                    id="oldPassword"
                    type="password"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="oldPassword"
                    onChange={handleChange}
                    value={oldPassword}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="New Password"
                    id="newPassword"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                  />
                </div>
                <p style={{ color: "blue" }}>
                  password must contain atleast one uppercase, one lowercase,
                  one number and one special character and length must be
                  minimum 8
                </p>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={togglePasswordBox}>
                Close
              </MDBBtn>
              <MDBBtn type="submit" onClick={handlePasswordSubmit}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default UserDashboard;
