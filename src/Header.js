import React from "react";
import logo from "./img/ic_logo.svg";
import { ImLibrary } from "react-icons/im";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <div className="headercontent">
                    <p>
                        <ImLibrary />
                        &nbsp;&nbsp;LIBRARY
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Header;
