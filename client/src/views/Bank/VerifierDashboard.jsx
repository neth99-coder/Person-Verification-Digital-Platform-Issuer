import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import authService from "../../services/authService";
import styles from "./bank.module.css";

import bg from "../../assets/images/2154438.jpg";
import Web3 from "web3";
import { loadContracts } from "./../../utils/load-contracts";

function VerifierDashboard() {
  const [basicModal, setBasicModal] = useState(false);
  const [OptionBox, setOptionBox] = useState(false);
  const [RegisterationModal, setRegistrationModal] = useState(false);
  const [verifier_profile, setVerifierProfile] = useState([]);
  const [subscribedServices, setSubscribedServices] = useState([]);
  const [account, setAccount] = useState(false);
  const [loan, setLoan] = useState(false);
  const [card, setCard] = useState(false);
  const [validated, setValidated] = useState(false); //form validation
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [PasswordBox, setPasswordBox] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const toggleOptions = () => setOptionBox(!OptionBox);
  const togglePasswordBox = () => setPasswordBox(!PasswordBox);
  const toggleRegisterModal = () => setRegistrationModal(!RegisterationModal);

  //web3

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [web3Account, setWeb3Account] = useState([]);
  const [registered, setRegistered] = useState(true);

  //TODO: when open the modal and register -> add then update services
  //TODO: when we update service in database -> update it in blockchain as well

  const saveServiceChange = () => {
    if (web3Account !== undefined) {
      const services = [];
      account && services.push("Bank Account Creation");
      loan && services.push("Bank Loan Services");
      card && services.push("Credit Card Services");

      axios
        .post("http://localhost:3001/api/v1/user/updateServices", {
          email: verifier_profile.email,
          services: services,
        })
        .then(async (res) => {
          if (res.data.error) {
            alert("Error occured !!");
          } else {
            const { contract } = web3Api;
            await contract.updateServices(account, loan, card, {
              from: web3Account,
            });
            alert("success");
            // console.log(res.data)
            window.location.reload(false);
          }
        });
    } else {
      alert("Connect to metamask");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "Bank Account Creation") {
      setAccount(!account);
    } else if (name == "Bank Loan Services") {
      setLoan(!loan);
    } else if (name == "Credit Card Services") {
      setCard(!card);
    } else if (name === "oldPassword") {
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
          email: verifier_profile.email,
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
    const getVerifier = async () => {
      await axios
        .get("http://localhost:3001/api/v1/user/getUser", {
          params: {
            email: email,
          },
        })
        .then((res) => {
          setVerifierProfile(res.data);
          // setAvailable([
          //   "Bank Account Creation",
          //   "Bank Loan Services",
          //   "Credit Card Services",
          // ].filter((x) => !res.data.services.includes(x)));
          setSubscribedServices(res.data.services);
          res.data.services.includes("Bank Account Creation") &&
            setAccount(true);
          res.data.services.includes("Bank Loan Services") && setLoan(true);
          res.data.services.includes("Credit Card Services") && setCard(true);
        });
    };
    getVerifier();

    const loadProvider = async () => {
      let provider = null;
      let contract = null;

      if (window.ethereum) {
        provider = window.ethereum;

        try {
          await provider.request({ method: "eth_requestAccounts" });
        } catch {
          console.error("User accounts access denied");
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        window.alert(
          "No ethereum browser detected !! Check out your Metamask."
        );
      }
      contract = await loadContracts("AuthVerifier", provider);
      setWeb3Api({ web3: new Web3(provider), provider, contract });
      console.log(provider, "PROVIDER");
      console.log(contract, "Contract");
    };
    loadProvider();
  }, []);

  const getRegistered = async () => {
    console.log(web3Account, "Console");
    if (web3Account !== undefined) {
      const { contract } = web3Api;
      console.log("Hi");
      const verifierExist = await contract.getVerifierExist({
        from: web3Account,
      });
      console.log(verifierExist);

      setRegistered(verifierExist);
      toggleRegisterModal();
    } else {
      alert("Connect to metamask");
    }
  };

  const register = async () => {
    if (web3Account !== undefined) {
      console.log("B4");
      const { contract } = web3Api;
      await contract.addVerifier(account, loan, card, {
        from: web3Account,
      });

      console.log("After");
      window.location.reload(false);
    } else {
      alert("Connect to metamask");
    }
  };

  useEffect(() => {
    const getAccounts = async () => {
      let accounts = await web3Api.web3.eth.getAccounts();
      console.log(accounts[0]);
      setWeb3Account(accounts[0]);
    };

    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

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

          <p className="px-3" style={{ marginTop:"-10pt",color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
          <div className="px-3" >
            <MDBCard className={styles['public-key']} style={{display:"inline",backgroundColor:"rgb(0,0,0,0.05)",padding:"0.7vw",width:"6vw"}}>
              {"Public Key: "}
              {web3Account ? web3Account : "0x..........."}
            </MDBCard>

            <MDBBtn className={styles['id-details']} style={{display:"inline",marginLeft:"10pt",padding:"9pt 10pt",fontSize:"10pt"}} onClick={getRegistered}>
              View verifiable ID Details
            </MDBBtn>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5 pb-0">
              <div className="verifier-buttons" style={{ marginTop: "20pt" }}>
                <MDBCard
                  background="primary"
                  className="text-white mb-6 hover-focus"
                >
                  <MDBCardBody onClick={toggleShow}>
                    <MDBCardTitle
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      View Profile
                    </MDBCardTitle>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard
                  background="primary"
                  className="text-white mb-6 hover-focus"
                >
                  <MDBCardBody onClick={toggleOptions}>
                    <MDBCardTitle
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      Add New Service
                    </MDBCardTitle>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBModal show={OptionBox} setShow={setOptionBox} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Service</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  toggleOptions();
                  console.log(subscribedServices);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {[
                "Bank Account Creation",
                "Bank Loan Services",
                "Credit Card Services",
              ].map((item, i) => (
                <div>
                  <input
                    type="checkbox"
                    id={i}
                    name={item}
                    style={{ float: "right" }}
                    checked={
                      item == "Bank Account Creation"
                        ? account
                        : item == "Bank Loan Services"
                        ? loan
                        : card
                    }
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label>{item}</label>
                </div>
              ))}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOptions}>
                Close
              </MDBBtn>
              <MDBBtn onClick={saveServiceChange}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBCardImage
                  src={`http://localhost:3001/reg/${verifier_profile.photo_id}`}
                  alt=""
                  className="rounded-circle me-3"
                  fluid
                  style={{ width: "75px" }}
                />
                Profile Info
              </MDBModalTitle>
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
                      <MDBCardText>Name </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted ">
                        {verifier_profile.name}
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
                        {verifier_profile.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Contact Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {verifier_profile.contact_number}
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
                        {verifier_profile.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Required Services</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {subscribedServices.map((x) => (
                        <MDBCardText className="text-muted">{x}</MDBCardText>
                      ))}
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
              <MDBBtn color="secondary" onClick={toggleShow}>
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
      <MDBModal
        show={RegisterationModal}
        setShow={setRegistrationModal}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Verifiable ID Details</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleRegisterModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard>
                <MDBCardBody style={{ paddingLeft: "30px" }}>
                  <MDBRow>
                    {!registered ? (
                      <MDBBtn className="primary" onClick={register}>
                        Generate Verifiable ID
                      </MDBBtn>
                    ) : (
                      <>
                        <p>You have registered for</p>
                        <br />
                        <ul styles={{ marginLeft: "10px" }}>
                          {account && <li>Bank Account Creation</li>}

                          {loan && <li>Bank Loan</li>}
                          {card && <li>Request for Card</li>}
                        </ul>
                      </>
                    )}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleRegisterModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}
export default VerifierDashboard;
