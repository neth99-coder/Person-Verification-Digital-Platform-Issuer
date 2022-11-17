import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Axios from "axios";
import AddImage from "../../components/common/addImage";
import Joi from "joi-browser";
import { toast } from "react-toastify";
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

import sbi from "../../assets/images/sample_bank.png";
import bg2 from "../../assets/images/Tiny cartoon business people reading legal document.jpg";
import bg3 from "../../assets/images/5869.jpg";
import bg4 from "../../assets/images/signupbanner.jpg";
function VerReg() {
  const [bank, setBank] = useState({
    name: "",
    photo_id: "",
    cc_photo_id: "",
    email: "",
    password: "XXXXX",
    address: "",
    contact_number: "",
    role: "bank",
    isAccepted: "0",
  });
  const [errors, setErrors] = useState({});
  const schema = {
    name: Joi.string().required().min(2).max(50),
    photo_id: Joi.string().required(),
    cc_photo_id: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    address: Joi.string().required().min(5).max(1024),
    contact_number: Joi.string().required().regex(/[0-9]{10}/),
    role: Joi.string().required(),
    isAccepted: Joi.string().required(),
  };

  const [sampleImg, setSampleImg] = useState(sbi);
  const [validated, setValidated] = useState(false); //form validation
  //const navigate = useNavigate();
  const [account, setAccount] = useState(false);
  const [loan, setLoan] = useState(false);
  const [card, setCard] = useState(false);
  const [submiited, setSubmitted] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "name") {
      setBank((prev_val) => {
        return { ...prev_val, name: value };
      }); setErrors((prev_val)=>{return {...prev_val,[name]:""}})
    } else if (name === "contact_number") {
      setBank((prev_val) => {
        return { ...prev_val, contact_number: value };
      }); setErrors((prev_val)=>{return {...prev_val,[name]:""}})
    } else if (name === "address") {
      setBank((prev_val) => {
        return { ...prev_val, address: value };
      }); setErrors((prev_val)=>{return {...prev_val,[name]:""}})
    } else if (name === "email") {
      setBank((prev_val) => {
        return { ...prev_val, email: value };
      }); setErrors((prev_val)=>{return {...prev_val,[name]:""}})
    }
  }

  function handleSaveImage(newImageUrl, newImage) {
    setSampleImg(newImageUrl);
    console.log(newImage, newImageUrl);
    const reader = new FileReader();
    reader.readAsDataURL(newImage);
    reader.onloadend = () => {
      setBank((prev_val) => {
        return { ...prev_val, photo_id: reader.result };
      });
    };
  }

  function handleCc(e) {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBank((prev_val) => {
        return { ...prev_val, cc_photo_id: reader.result };
      });
    };
  };
  
  function checkValidityJoi(){
    const result = Joi.validate(bank, schema, { abortEarly: false });
    console.log(result);
    const { error } = result;
    if (error) {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        if(name=="contact_number"){
          let msg = message.split(`" `)[2];
          
          errorData[name] = msg!=undefined && msg.split(":")[0]}
        else{errorData[name] = message.split(`" `)[1]};
      }
      
      console.log(errorData);
      setErrors(errorData);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    checkValidityJoi();

    //form validation
    if (form.checkValidity() === false) {
      toast.error("Invalid Inputs !! Checkout !!", { theme: "dark" });
      setValidated(true);
      e.stopPropagation();
    } else {
      setSubmitted(!submiited)
      setValidated(true);
      //console.log(person)

      const formData = new FormData();

      formData.append("name", bank.name);
      formData.append("photo_id", bank.photo_id);
      formData.append("cc_photo_id", bank.cc_photo_id);
      formData.append("email", bank.email);
      formData.append("password", bank.password);
      formData.append("address", bank.address);
      formData.append("contact_number", bank.contact_number);
      formData.append("role", bank.role);
      formData.append("isAccepted", bank.isAccepted);
      formData.append("account", account);
      formData.append("loan", loan);
      formData.append("card", card);

      Axios.post("http://localhost:3001/api/v1/user/addUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'x-auth-token': authService.getUserToken(),
        },
      }).then((res) => {
        if (!res.data.success) {
          // console.log(res.data.error)
          setSubmitted(false);
          toast.error("Something went wrong !!", { theme: "dark" });
        } else {
          // console.log("success");
          //navigate("/");
          window.location.href = "/";
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
                  className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-5"
                  style={{ color: "blue", marginBottom: "20px" }}
                >
                  Register as a Verifier
                </h2>

                <div className="d-flex flex-row align-items-center mb-1 ">
                  <MDBInput
                    label="Name of Organization"
                    id="form1"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="name"
                    onChange={handleChange}
                    value={bank.first_name}
                    minLength="2"
                    maxLength="50"
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">{errors["name"]}</p>
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Type of Organization"
                    id="form2"
                    type="text"
                    style={{ width: "250px" }}
                  />
                </div> */}

                <div className="d-flex flex-row align-items-center mb-1">
                  <MDBInput
                    label="Address"
                    id="form3"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="address"
                    onChange={handleChange}
                    value={bank.address}
                    required
                    minLength="5"
                    maxLength="1024"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">{errors["address"]}</p>
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Postal Code"
                    id="form4"
                    type="text"
                    style={{ width: "250px" }}
                  />
                </div> */}
                <div className="d-flex flex-row align-items-center mb-1">
                  <MDBInput
                    label="Contact Number"
                    id="form5"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="contact_number"
                    onChange={handleChange}
                    value={bank.contact_number}
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">
                    {errors["contact_number"]}
                  </p>
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <MDBInput
                    label="E-mail"
                    id="form6"
                    type="email"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="email"
                    onChange={handleChange}
                    value={bank.email}
                    required
                    minLength="5"
                    maxLength="255"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">{errors["email"]}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary ms-2"
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
                  className="text-center h4 fw-bold mb-4 mx-1 mx-md-4 mt-5"
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
                  <h5 className="justify-content-left mb-3 mt-2">
                    Select required services
                  </h5>

                  <div className="form-check d-flex justify-content-left mb-3 mt-2">
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
                    <label className="form-check-label" for="ch1">
                      Bank Account Creation
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-left mb-3">
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
                    <label className="form-check-label" for="ch2">
                      Bank Loan Services
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-left mb-3">
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
                    <label className="form-check-label" for="ch3">
                      Credit Card Services
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center mb-4 mt-3">
                  <MDBInput
                    type="file"
                    className="form-control"
                    id="bankDoc"
                    style={{
                      display: "inline-block",
                      width: "25vw",
                      minWidth: "200px",
                    }}
                    name="cc_photo_id"
                    // onChange={(e) => {
                    //   setBank((prev_val) => {
                    //     return { ...prev_val, cc_photo_id: e.target.files[0] };
                    //   });
                    // }}
                    onChange={handleCc}
                    required
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                  <p style={{ color: "blue", marginTop: "10px" }}>
                    upload proof of company registration
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    className="btn btn-warning ms-2 mb-5"
                    onClick={() => {
                      document.querySelector(".firstPage").style.display =
                        "block";
                      document.querySelector(".secondPage").style.display =
                        "none";
                    }}
                  >
                    Prev Page
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-2 mb-5"
                    onClick={() => {
                      document.querySelector(".thirdPage").style.display =
                        "block";
                      document.querySelector(".secondPage").style.display =
                        "none";
                    }}
                  >
                    Next Page
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
        <MDBCard
          className="text-black m-5 thirdPage"
          style={{ borderRadius: "25px", display: "none" }}
        >
          <MDBCardBody>
            <MDBRow center className="pb-3">
              <MDBCol className="order-2 order-lg-1 d-flex flex-column align-items-center ">
                <h2
                  className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-5 pb-4"
                  // style={{ marginBottom: "10px" }}
                >
                  Upload Bank Logo
                </h2>
                <div className="container-fluid p-10 mt-3">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "15px",
                    }}
                  >
                    {/* <img
                      src={src}
                      alt=""
                      style={{
                        width: "200px",
                        height: "200px",
                        border: "5px solid",
                        borderRadius: "50%",
                      }}
                    /> */}
                  </div>
                  <AddImage
                    saveImage={handleSaveImage}
                    removeImage={() => {}}
                    aspectRatio={1 / 1}
                    className="w-75"
                  />
                </div>

                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="p-5"
                >
                  <button
                    type="button"
                    className="btn btn-warning  ms-2"
                    onClick={() => {
                      document.querySelector(".secondPage").style.display =
                        "block";
                      document.querySelector(".thirdPage").style.display =
                        "none";
                    }}
                    hidden={submiited}
                  >
                    Prev Page
                  </button>
                  <button type="submit" className="btn btn-warning  ms-2" disabled hidden={!submiited}>
                  Prev Page
                  </button>
                  <button type="submit" className="btn btn-primary  ms-2" hidden={submiited}>
                    Submit
                  </button>
                  <button type="submit" className="btn btn-primary  ms-2" disabled hidden={!submiited}>
                    Submitting .... {" "}
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="5"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src={bg4} fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </Form>
    </MDBContainer>
  );
}

export default VerReg;
