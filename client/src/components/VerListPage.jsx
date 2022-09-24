import React from "react";
import VerRequest from './VerReqCard'
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,

} from 'mdb-react-ui-kit';

export default function VerListPage() {
    return (

        <div style={{ width: "100vw", padding: "20px", display: 'flex', flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
            <VerRequest />
            <VerRequest />
            <VerRequest />
            <VerRequest />



        </div>


    )
}