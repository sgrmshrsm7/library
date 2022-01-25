import React from "react";
import logo from "./img/ic_logo.svg";
import { ImLibrary } from "react-icons/im";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="headercontent">
                <p>
                    <Link to="/">
                        <ImLibrary />
                        &nbsp;&nbsp;LIBRARY
                    </Link>
                </p>

                <nav>
                    <ul>
                        <li>
                            <div className="profile">
                                <BsPersonFill />
                            </div>
                            <ul>
                                <li>
                                    Name: <span>Chintu Prasad</span>
                                </li>
                                <li>
                                    Student ID: <span>22792</span>
                                </li>
                                <li>
                                    Email: <span>chintu@pintu.com</span>
                                </li>
                                <li>
                                    Pending Fine: <span>420</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
