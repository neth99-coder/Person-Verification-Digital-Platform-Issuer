import { React } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import bg from "../../assets/images/idaccept.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import Axios from "axios";
import { toast } from "react-toastify";
import authService from "../../services/authService";

export default function IDReqViewPage() {
  let location = useLocation();
  let { obj } = location.state;
  const navigate = useNavigate();

  const handleClick = async (e) => {
    //console.log(e.target.name === 'accept')
    e.target.name === "accept"
      ? (obj.isAccepted = "1")
      : (obj.isAccepted = "-1");

    await Axios.put(
      process.env.REACT_APP_API_URL + "/user/updateUser/" + obj._id,
      obj,
      {
        headers: {
          "x-auth-token": authService.getJwt(),
        },
      }
    ).then((res) => {
      if (!res.data.success) {
        console.log(res.data.error);
        alert("Error occured !!");
      } else {
        alert("Succefully Updated");
        toast.success("Succefully Updated", { theme: "dark" });
        //console.log("success");
        navigate("/issuer/id-requests");
      }
    });
  };

  return (
    <div>
      <div className="p-5 text-center">
        <div className="p-5">
          <img
            src={obj.photo_id.url}
            alt=""
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
        </div>
        <h1 className="mb-3 fs-1 fw-bold">
          User Profile - {obj.first_name} {obj.last_name}
        </h1>
      </div>
      <div>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol center>
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted ">
                        {obj.first_name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {obj.last_name}
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
                        {obj.nic}
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
                        {obj.dob.split("T")[0]}
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
                        {obj.contact_number}
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
                        {obj.address}
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
                        {obj.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>NIC copy</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <button
                        className="btn  btn-outline-dark btn-sm"
                        onClick={() => {
                          saveAs(obj.nic_photo_id.url, "nic_copy");
                        }}
                      >
                        {" "}
                        Download
                      </button>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Birth Certificate Copy</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <button
                          className="btn  btn-outline-dark btn-sm"
                          onClick={() => {
                            saveAs(obj.bc_photo_id.url, "bc_copy");
                          }}
                        >
                          {" "}
                          Download
                        </button>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    margin: "20px",
                  }}
                >
                  <button
                    type="button"
                    class="btn btn-primary  ms-2"
                    onClick={handleClick}
                    name="accept"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning  ms-2"
                    onClick={handleClick}
                    name="reject"
                  >
                    Reject
                  </button>
                </div>
              </MDBCard>
            </MDBCol>
            {/* <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={bg} fluid />
            </MDBCol> */}
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}
