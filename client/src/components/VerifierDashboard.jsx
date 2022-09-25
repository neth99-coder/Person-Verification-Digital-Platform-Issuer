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
    MDBInput,
}
    from 'mdb-react-ui-kit';

import bg from '../images/2154438.jpg';

function VerifierDashboard() {
    const [basicModal, setBasicModal] = useState(false);
    const [OptionBox, setOptionBox] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    const toggleOptions = () => setOptionBox(!OptionBox);


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
                                <MDBCardBody onClick={toggleOptions}>
                                    <MDBCardTitle style={{ textAlign: 'center' }}>Add New Service</MDBCardTitle>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCardBody>

                    </MDBCard>


                </MDBCol>

            </MDBRow>
            <MDBModal show={OptionBox} setShow={setOptionBox} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New Service</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label="New Service"
                                id="form6"
                                type="text"
                                style={{ width: "250px" }}
                            />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOptions}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
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
                                            <MDBCardText>Name </MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted ">Bank Of Ceylon</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Type </MDBCardText>
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

export default VerifierDashboard;