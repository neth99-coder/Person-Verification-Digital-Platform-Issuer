import React from 'react';

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
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import bg1 from '../images/Data_security_05.jpg';
import bg2 from '../images/Tiny cartoon business people reading legal document.jpg'
import { HiHome } from 'react-icons/fa';
import { Button } from 'bootstrap';



function UsrReg() {
    return (
        <MDBContainer fluid >

            <MDBCard className='text-black m-5 firstPage' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h2 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: "blue", marginBottom: "20px" }}>Register as a User</h2>

                            <div className="d-flex flex-row align-items-center mb-4 ">

                                <MDBInput label='First Name' id='form1' type='text' style={{ width: "250px" }} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='Last Name' id='form2' type='text' style={{ width: "250px" }} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='NIC Number' id='form3' type='text' style={{ width: "250px" }} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4" >
                                <MDBInput label='DOB' id='form4' type='date' style={{ width: "250px" }} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='Phone Number' id='form5' type='text' style={{ width: "250px" }} />
                            </div>


                            <button type="button" class="btn btn-warning btn-lg ms-2" onClick={() => { document.querySelector('.firstPage').style.display = 'none'; document.querySelector('.secondPage').style.display = 'block' }}>Next Page</button>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src={bg1} fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

            <MDBCard className='text-black m-5 secondPage' style={{ borderRadius: '25px', display: "none" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: "red" }}>* Do not submit forged documents *</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">

                                <MDBInput label='Address' id='form6' type='text' style={{ width: "300px" }} />
                            </div>

                            <div className="d-flex flex-column align-items-center mb-4">


                                <MDBInput type="file" class="form-control" id="customFile1" style={{ width: "300px" }} />
                                <p style={{ color: "blue" }}>upload copy of NIC</p>

                            </div>


                            <div className="d-flex flex-column align-items-center mb-4">


                                <MDBInput type="file" class="form-control" id="customFile2" style={{ width: "300px" }} />
                                <p style={{ color: "blue" }}>upload Birth Certificate copy</p>

                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBInput label='email' id='form7' type='email' style={{ width: "300px" }} />
                            </div>



                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <button type="button" class="btn btn-warning btn-lg ms-2" onClick={() => { document.querySelector('.firstPage').style.display = 'block'; document.querySelector('.secondPage').style.display = 'none' }}>Prev Page</button>
                                <button type="button" class="btn btn-primary btn-lg ms-2" >Submit</button>
                            </div>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src={bg2} fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default UsrReg;