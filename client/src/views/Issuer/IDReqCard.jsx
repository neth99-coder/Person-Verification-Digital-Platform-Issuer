import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import userimg from "../../assets/images/user-image.jpg";

export default function IDReqCard(props) {
  return (
    <div className="reqCard m-2">
      <MDBCard
        style={{ borderRadius: "15px", height: "325px", width: "200px" }}
      >
        <MDBCardBody className="text-center">
          <div className="mt-3 mb-4">
            <MDBCardImage
              src={userimg}
              className="rounded-circle"
              fluid
              style={{ width: "100px" }}
            />
          </div>
          <MDBTypography tag="h4">
            {props.user.first_name + " " + props.user.last_name}
          </MDBTypography>
          <MDBCardText className="text-muted mb-4">Wallet Owner</MDBCardText>

          <MDBBtn
            rounded

            // onClick={() => {
            //   window.location.href = "/idreq";
            // }}
          >
            <Link
              to={`../id-requests/${props.user.nic}`}
              state={{ obj: props.user }}
              style={{ color: "white" }}
            >
              View
            </Link>
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
