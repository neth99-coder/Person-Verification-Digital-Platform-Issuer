import React from "react";
import IDReq from './IDReqCard'
export default function IDListPage() {
    return (
        <div style={{ width: "100vw", padding: "20px", display: 'flex', flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-between" }}>
            <IDReq />
            <IDReq />
            <IDReq />
            <IDReq />
            <IDReq />
            <IDReq />
        </div>
    )
}