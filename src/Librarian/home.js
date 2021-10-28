import React from "react";
import { Link } from "react-router-dom";

const home_lib = () => {
    return (
        <div className="librarianhome">
            <Link to="/register">
                <div className="libHomeButton">Register A New Student</div>
            </Link>
            <Link to="/librarian/home/updatefine">
                <div className="libHomeButton">Update Fine Of A Student</div>
            </Link>
            <Link to="/librarian/home/add">
                <div className="libHomeButton">Add New Book</div>
            </Link>
            <Link to="/librarian/home/update">
                <div className="libHomeButton">Update Student Info</div>
            </Link>
            <Link to="/librarian/home/search">
                <div className="libHomeButton">Availability Of A Book</div>
            </Link>
        </div>
    );
};

export default home_lib;
