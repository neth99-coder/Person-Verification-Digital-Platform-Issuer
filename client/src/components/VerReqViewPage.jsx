import { React } from 'react'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,

} from 'mdb-react-ui-kit';
import bg from '../images/idaccept.jpg'

export default function IDReqViewPage() {
    return (
        <div>
            <div >
                <MDBContainer fluid>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard >
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Name of Organization</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted ">Bank Of Ceylon</MDBCardText>
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
                                            <MDBCardText className="text-muted">WRMV+266, 01 Bank of Ceylon Mawatha, Colombo 00100</MDBCardText>
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
                                            <MDBCardText className="text-muted">(011) 2523321</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">boc@gmail.com</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Required Services</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Bank Account Creation</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Proof of Registration</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted"></MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    
                                </MDBCardBody>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "20px" }}>
                                    <button type="button" class="btn btn-primary btn-lg ms-2">
                                        Accept
                                    </button>
                                    <button type="button" class="btn btn-warning btn-lg ms-2">
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
    )
}