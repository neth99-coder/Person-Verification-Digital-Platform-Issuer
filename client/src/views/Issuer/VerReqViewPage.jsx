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
      process.env.REACT_APP_API_URL + "/user/updateUser/" + obj._id,
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
        navigate("/issuer/ver-requests");
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
        <h1 className="mb-3 fs-1 fw-bold">Verifier Profile - {obj.name}</h1>
      </div>
      <div>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Name of Organization</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted ">
                        {obj.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Type of Organization</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">Bank</MDBCardText>
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
                      <MDBCardText>Postal Code</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">00130</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Contact Number</MDBCardText>
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
                      <MDBCardText>Required Services</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {obj.services.map((cur) => {
                          return cur + ", ";
                        })}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Proof of Registration</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <button
                          className="btn  btn-outline-dark btn-sm "
                          onClick={() => {
                            saveAs(obj.cc_photo_id.url, "cc_copy");
                          }}
                        >
                          {" "}
                          Download
                        </button>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
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
