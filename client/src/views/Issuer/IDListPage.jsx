import React from "react";
import IDReq from "./IDReqCard";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function IDListPage() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      await Axios.get("http://localhost:3001/api/v1/user/getPendingWalletUsers", {
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
      {/* <IDReq />
      <IDReq />
      <IDReq />
      <IDReq />
      <IDReq />
      <IDReq /> */}
      {requestList?.map((cur_request,index)=>{
        return <IDReq key={index} user={cur_request}/>
      })}

    </div>
  );
}
