import React from "react";
import { Form } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
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
import bg3 from "../../assets/images/signupbanner.jpg";
import { HiHome } from "react-icons/fa";
import { Button } from "bootstrap";
import { useState } from "react";
import AddImage from "../../components/common/addImage";
import { toast } from "react-toastify";
import { useEffect } from "react";

function formatDate(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}

function UsrReg() {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    status: "Single",
    nationality: "Sinhalese",
    nic: "",
    dob: "",
    photo_id: "",
    nic_photo_id: "",
    bc_photo_id: "",
    email: "",
    // password: "XXXXX",
    address: "",
    contact_number: "",
    role: "wallet_owner",
    isAccepted: "0",
    gender: "Male",
  });
  const [submiited, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const schema = {
    first_name: Joi.string().required().min(2).max(50),
    last_name: Joi.string().required().min(2).max(50),
    status: Joi.string().required(),
    nationality: Joi.string().required(),
    nic: Joi.string()
      .required()
      .regex(/[0-9]{9}V|[0-9]{12}/),
    dob: Joi.string().required(),
    photo_id: Joi.string().required(),
    nic_photo_id: Joi.string().required(),
    bc_photo_id: Joi.string().required(),
    email: Joi.string().required().min(5).max(255).email(),
    // password: "XXXXX",
    address: Joi.string().required().min(5).max(1024),
    contact_number: Joi.string()
      .required()
      .regex(/[0-9]{10}/),
    role: Joi.string().required(),
    isAccepted: Joi.string().required(),
    gender: Joi.string().required(),
  };

  const [src, setsrc] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );
  const [validated, setValidated] = useState(false); //form validation
  // const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "f_name") {
      setPerson((prev_val) => {
        return { ...prev_val, first_name: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, first_name: "" };
      });
    } else if (name === "last_name") {
      setPerson((prev_val) => {
        return { ...prev_val, last_name: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "status") {
      setPerson((prev_val) => {
        return { ...prev_val, status: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "nationality") {
      setPerson((prev_val) => {
        return { ...prev_val, nationality: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "nic") {
      setPerson((prev_val) => {
        return { ...prev_val, nic: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "dob") {
      setPerson((prev_val) => {
        return { ...prev_val, dob: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "contact_number") {
      setPerson((prev_val) => {
        return { ...prev_val, contact_number: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "address") {
      setPerson((prev_val) => {
        return { ...prev_val, address: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "email") {
      setPerson((prev_val) => {
        return { ...prev_val, email: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    } else if (name === "gender") {
      setPerson((prev_val) => {
        return { ...prev_val, gender: value };
      });
      setErrors((prev_val) => {
        return { ...prev_val, [name]: "" };
      });
    }
  }

  function handleSaveImage(newImageUrl, newImage) {
    setsrc(newImageUrl);
    console.log(newImage, newImageUrl);
    const reader = new FileReader();
    reader.readAsDataURL(newImage);
    reader.onloadend = () => {
      setPerson((prev_val) => {
        return { ...prev_val, photo_id: reader.result };
      });
    };
  }

  function handleBc(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    setFileToBase(file, name);
    console.log(file);
  }

  function handleNic(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    setFileToBase(file, name);
    console.log(file);
  }

  const setFileToBase = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (name == "bc_photo_id") {
        setPerson((prev_val) => {
          return { ...prev_val, bc_photo_id: reader.result };
        });
      } else if (name == "nic_photo_id") {
        setPerson((prev_val) => {
          return { ...prev_val, nic_photo_id: reader.result };
        });
      } else if (name == "photo_id") {
        setPerson((prev_val) => {
          return { ...prev_val, photo_id: reader.result };
        });
      }
    };
  };

  function checkValidityJoi() {
    const result = Joi.validate(person, schema, { abortEarly: false });
    console.log(result);
    const { error } = result;
    if (error) {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        if (name == "nic" || name == "contact_number") {
          let msg = message.split(`" `)[2];

          errorData[name] = msg != undefined && msg.split(":")[0];
        } else {
          errorData[name] = message.split(`" `)[1];
        }
      }

      console.log(errorData);
      setErrors(errorData);
    }
  }

  // function checkValidityField(name) {
  //   const result = Joi.validate(person, schema, { abortEarly: false });

  //   const { error } = result;
  //   let message = "";
  //   if (error) {

  //     for (let item of error.details) {
  //       const name_field = item.path[0];

  //       if (name_field == name) {
  //         console.log(name_field);
  //         console.log("YES")
  //         message = item.message;
  //         if (name== "nic" || name == "contact_number") {
  //           let msg = message.split(`" `)[2];
  //           message = msg != undefined && msg.split(":")[0];
  //         } else {
  //           message = message.split(`" `)[1];
  //         }
  //       }
  //     }
  //   }
  //  const validity =  message =="" ? true:false
  //  return validity
  // }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    checkValidityJoi();

    //form validation
    if (form.checkValidity() === false) {
      toast.error("Invalid Inputs !! Checkout !!", { theme: "dark" });
      console.log("Empty");
      setValidated(true);
      e.stopPropagation();
    } else {
      setSubmitted(!submiited);
      setValidated(true);
      //console.log(person)

      const formData = new FormData();

      formData.append("first_name", person.first_name);
      formData.append("last_name", person.last_name);
      formData.append("status", person.status);
      formData.append("nationality", person.nationality);
      formData.append("nic", person.nic);
      formData.append("dob", person.dob);
      formData.append("photo_id", person.photo_id);
      formData.append("nic_photo_id", person.nic_photo_id);
      formData.append("bc_photo_id", person.bc_photo_id);
      formData.append("email", person.email);
      // formData.append("password", person.password);
      formData.append("address", person.address);
      formData.append("contact_number", person.contact_number);
      formData.append("role", person.role);
      formData.append("isAccepted", person.isAccepted);
      formData.append("gender", person.gender);

      // console.log(...formData);

      Axios.post(process.env.REACT_APP_API_URL + "/user/addUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'x-auth-token': authService.getUserToken(),
        },
      }).then((res) => {
        if (!res.data.success) {
          setSubmitted(false);
          toast.error("Something went wrong !!", { theme: "dark" });
        } else {
          //console.log("success");
          // navigate("/");
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
          <MDBCardBody className="m-auto">
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h2
                  className="text-center h2 fw-bold mx-1 mx-md-4 mt-2"
                  style={{ color: "blue", marginBottom: "20px" }}
                >
                  Register as a User
                </h2>

                <div className="d-flex flex-row align-items-center mb-1">
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
                    minLength="2"
                    maxLength="50"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">
                    {errors["first_name"]}
                  </p>
                </div>

                <div className="d-flex flex-row align-items-center mb-1">
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
                    minLength="2"
                    maxLength="50"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">{errors["last_name"]}</p>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
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
                    min={
                      new Date().getFullYear() -
                      80 +
                      "-" +
                      formatDate(new Date().getMonth() + 1) +
                      "-" +
                      formatDate(new Date().getDate())
                    }
                    max={
                      new Date().getFullYear() -
                      16 +
                      "-" +
                      formatDate(new Date().getMonth() + 1) +
                      "-" +
                      formatDate(new Date().getDate())
                    }
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
                    <label className="mb-1">Gender</label>
                    <Form.Select
                      value={person.gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-1">
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
                    pattern="[0-9]{9}V|[0-9]{12}"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-0">
                  <p class="fs-6 fw-light text-danger">{errors["nic"]}</p>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
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

                <button
                  type="button"
                  className="btn btn-primary  ms-2"
                  onClick={() => {
                    document.querySelector(".secondPage").style.display =
                      "block";
                    document.querySelector(".firstPage").style.display = "none";
                  }}
                >
                  Next Page
                </button>
              </MDBCol>

              <MDBCol
                md="6"
                lg="5"
                className="order-1 order-lg-2 d-flex align-items-center "
              >
                <MDBCardImage src={bg1} fluid className="align-self-center" />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard
          className="text-black m-3 secondPage mt-5"
          style={{ borderRadius: "25px", display: "none" }}
        >
          <MDBCardBody className="mb-1">
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center "
              >
                <p
                  className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-2"
                  style={{ color: "red" }}
                >
                  * Do not submit forged documents *
                </p>

                <div className="d-flex flex-row align-items-center mb-1 ">
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
                    minLength="5"
                    maxLength="1024"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-0">
                  <p class="fs-6 fw-light text-danger">{errors["address"]}</p>
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
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
                <div className="d-flex flex-column align-items-center mb-1">
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
                    // onChange={(e) => {
                    //   console.log(e.target.files[0]);
                    //   setPerson((prev_val) => {
                    //     return { ...prev_val, nic_photo_id: e.target.files[0] };
                    //   });
                    // }}
                    onChange={handleNic}
                    required
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                  <p style={{ color: "blue", marginTop: "10px" }}>
                    upload copy of NIC
                  </p>
                </div>

                <div className="d-flex flex-column align-items-center mb-1">
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
                    // onChange={(e) => {
                    //   setPerson((prev_val) => {
                    //     return { ...prev_val, bc_photo_id: e.target.files[0] };
                    //   });
                    // }}
                    onChange={handleBc}
                    required
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                  <p style={{ color: "blue", marginTop: "10px" }}>
                    upload Birth Certificate copy
                  </p>
                </div>

                <div className="d-flex flex-row align-items-center mb-1">
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
                    minLength="5"
                    maxLength="255"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
                  <p class="fs-6 fw-light text-danger">{errors["email"]}</p>
                </div>
                <div className="d-flex flex-row align-items-center mb-1">
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
                    pattern="[0-9]{10}"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-2">
                  <p class="fs-6 fw-light text-danger">
                    {errors["contact_number"]}
                  </p>
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
                  <button
                    type="button"
                    className="btn btn-primary  ms-2"
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
          className="text-black m-3 thirdPage mt-5"
          style={{ borderRadius: "25px", display: "none" }}
        >
          <MDBCardBody>
            <MDBRow center className="pb-3">
              <MDBCol className="order-2 order-lg-1 d-flex flex-column align-items-center ">
                <h2
                  className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-5 pb-4"
                  // style={{ marginBottom: "10px" }}
                >
                  Upload Your Profile Picture
                </h2>
                <div className="container-fluid p-10 mt-3">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "30px",
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
                  className="p-5 mt-5"
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
                  <button
                    type="submit"
                    className="btn btn-warning  ms-2"
                    disabled
                    hidden={!submiited}
                  >
                    Prev Page
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary  ms-2"
                    hidden={submiited}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary  ms-2"
                    disabled
                    hidden={!submiited}
                  >
                    Submitting ....{" "}
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                </div>
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
      </Form>
    </MDBContainer>
  );
}

export default UsrReg;
