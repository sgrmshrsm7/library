import React from "react";
import { Link } from "react-router-dom";

const Lib_home = () => {
    return (
        <div className="librarianhome">
            <Link to="/register">
                <div className="libHomeButton">Register A New Student</div>
            </Link>
            <Link to="/librarian/issuebook">
                <div className="libHomeButton">Issue Book</div>
            </Link>
            <Link to="/librarian/updatefine">
                <div className="libHomeButton">Update Fine Of A Student</div>
            </Link>
            <Link to="/librarian/add">
                <div className="libHomeButton">Add New Book to Library</div>
            </Link>
            <Link to="/librarian/update">
                <div className="libHomeButton">Update Student Info</div>
            </Link>
            <Link to="/librarian/returnbook">
                <div className="libHomeButton">Return Book</div>
            </Link>
            {/* <Link to="/search">
                <div className="libHomeButton">Availability Of A Book</div>
            </Link> */}
        </div>
    );
};

export default Lib_home;
