import { React, useState } from 'react';
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
}
    from 'mdb-react-ui-kit';

import bg from '../images/2154438.jpg';

function UserDashboard() {
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <MDBContainer fluid className='p-4'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column '>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Person Verification <br />
                        <span className="text-primary">Digital Platform</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                    </p>

                </MDBCol>

                <MDBCol md='6'>

                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5 pb-0'>

                            <MDBCard background='primary' className='text-white mb-6'>

                                <MDBCardBody onClick={toggleShow}>
                                    <MDBCardTitle style={{ textAlign: 'center' }}>View Profile</MDBCardTitle>

                                </MDBCardBody>

                            </MDBCard>
                            <MDBCard background='primary' className='text-white mb-6'>
                                <MDBCardBody onClick={() => { window.location.href = '/qr' }}>
                                    <MDBCardTitle style={{ textAlign: 'center' }}>Generate ID</MDBCardTitle>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCardBody>

                    </MDBCard>


                </MDBCol>

            </MDBRow>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Profile Info</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBCard >
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>First Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted ">Marshall</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Last Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Bruce</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>NIC Number</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">200000501646</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>DOB</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">2000-01-05</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Mobile</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">test@gmail.com</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />

                                </MDBCardBody>

                            </MDBCard>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>

                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </MDBContainer>
    );
}

export default UserDashboard;