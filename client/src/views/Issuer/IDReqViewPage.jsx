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
      "http://localhost:3001/api/v1/user/updateUser/" + obj._id,
      obj,
      {
        headers: {
          // 'x-auth-token': authService.getUserToken(),
        },
      }
    ).then((res) => {
      if (!res.data.success) {
        console.log(res.data.error);
        alert("Error occured !!");
      } else {
        alert("Succefully Updated");
        //console.log("success");
        navigate("/issuer/id-requests");
      }
    });
  };

  return (
    <div>
      <div>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol>
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
                          saveAs(
                            `http://localhost:3001/reg/${obj.nic_photo_id}`,
                            "nic_copy.pdf"
                          );
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
                            saveAs(
                              `http://localhost:3001/reg/${obj.bc_photo_id}`,
                              "bc_copy.pdf"
                            );
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
                    justifyContent: "space-evenly",
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
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={bg} fluid />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}
