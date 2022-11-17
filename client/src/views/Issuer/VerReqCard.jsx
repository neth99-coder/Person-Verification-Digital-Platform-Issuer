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
import bankimg from "../../assets/images/bank.jpg";

export default function VerReqCard(props) {
  return (
    <div className="reqCard m-2">
      <MDBCard
        style={{ borderRadius: "15px", height: "325px", width: "200px" }}
      >
        <MDBCardBody className="text-center">
          <div className="mt-3 mb-4">
            <MDBCardImage
              src={props.user.photo_id.url}
              className="rounded-circle"
              fluid
              style={{ width: "100px" }}
            />
          </div>
          <MDBTypography tag="h4">{props.user.name} </MDBTypography>
          <MDBCardText className="text-muted mb-4">verifier</MDBCardText>

          <MDBBtn
            rounded
            // onClick={() => {
            //   window.location.href = "/verreq";
            // }}
          >
            <Link
              to={`../ver-requests/${props.user.name}`}
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
