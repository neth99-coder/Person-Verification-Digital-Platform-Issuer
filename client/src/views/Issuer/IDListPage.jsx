import React from "react";
import IDReq from "./IDReqCard";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import authService from "../../services/authService";

export default function IDListPage() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      await Axios.get(
        process.env.REACT_APP_API_URL + "/user/getPendingWalletUsers",
        {
          headers: { "x-auth-token": authService.getJwt() },
        }
      ).then((res) => {
        //console.log(res.data);
        setRequestList(res.data);
      });
    };
    getRequests();
  }, []);

  return (
    <div>
      <div>
        <div className="p-5 text-center">
          <p className="mb-3 fs-1 fw-bold text-primary">USER ID REQUESTS</p>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {/* <IDReq />
      <IDReq />
      <IDReq />
      <IDReq />
      <IDReq />
      <IDReq /> */}
        {requestList.length == 0 ? (
          <h2>No Requests</h2>
        ) : (
          requestList?.map((cur_request, index) => {
            return <IDReq key={index} user={cur_request} />;
          })
        )}
      </div>
    </div>
  );
}
