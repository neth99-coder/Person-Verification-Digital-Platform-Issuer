import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data, idProperty }) => {
    return (
        <div className="table-responsive order-table-container">
            <table className="table table-hover">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={data}
                    columns={columns}
                    idProperty={idProperty}
                />
            </table>
        </div>
    );
};

export default Table;
