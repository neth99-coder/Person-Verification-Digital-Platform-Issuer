import React from "react";
import VerRequest from "./VerReqCard";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import IDReq from "./IDReqCard";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function VerListPage() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      await Axios.get("http://localhost:3001/api/v1/user/getPendingBanks", {
        //headers: { 'x-auth-token': authService.getUserToken() },
      }).then((res) => {
        //console.log(res.data);
        setRequestList(res.data);
      });
    };
    getRequests()
  }, []);



  return (
    <div
      style={{
        width: "100vw",
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {/* <VerRequest />
      <VerRequest />
      <VerRequest />
      <VerRequest /> */}
            {requestList?.map((cur_request,index)=>{
        return <VerRequest key={index} user={cur_request}/>
      })}
    </div>
  );
}
