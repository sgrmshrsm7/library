import React, { useContext, useState } from "react";
import logo from "./img/ic_logo.svg";
import { ImLibrary } from "react-icons/im";
import { BsPersonFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "./App";

const Header = () => {
    const { state, dispatch } = useContext(UserContext);

    const [linkto, setLinkto] = useState("/");

    const history = useHistory();
    const logout = () => {
        const logoutUser = async () => {
            const res = await fetch("/member/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: parseInt(
                        JSON.parse(localStorage.getItem("userData")).id
                    ),
                }),
            });
            const data = await res.json();
            if (!data || data.error || res.status != 200) {
                window.alert("Not logged out");
            } else {
                window.alert("Logged out");
                dispatch({
                    type: "USER",
                    payload: false,
                });
                setLinkto("/");
            }
        };
        logoutUser();
        localStorage.clear();
        history.push("/");
    };

    return (
        <div className="header">
            <div className="headercontent">
                {state || localStorage.hasOwnProperty("userData") ? (
                    <>
                        <p>
                            {"pendingFine" in
                            JSON.parse(localStorage.getItem("userData")) ? (
                                <Link to="/member/home">
                                    <ImLibrary />
                                    &nbsp;&nbsp;LIBRARY
                                </Link>
                            ) : (
                                <Link to="/librarian/home">
                                    <ImLibrary />
                                    &nbsp;&nbsp;LIBRARY
                                </Link>
                            )}
                        </p>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/search">
                                        <div className="profile">
                                            <BiSearchAlt />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <div className="profile">
                                        <BsPersonFill />
                                    </div>
                                    <ul>
                                        <li>
                                            Name:{" "}
                                            <span>
                                                {
                                                    JSON.parse(
                                                        localStorage.getItem(
                                                            "userData"
                                                        )
                                                    ).name
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            Student ID:{" "}
                                            <span>
                                                {
                                                    JSON.parse(
                                                        localStorage.getItem(
                                                            "userData"
                                                        )
                                                    ).id
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            Email:{" "}
                                            <span>
                                                {
                                                    JSON.parse(
                                                        localStorage.getItem(
                                                            "userData"
                                                        )
                                                    ).email
                                                }
                                            </span>
                                        </li>
                                        {"pendingFine" in
                                        JSON.parse(
                                            localStorage.getItem("userData")
                                        ) ? (
                                            <li>
                                                Pending Fine:{" "}
                                                <span>
                                                    {
                                                        JSON.parse(
                                                            localStorage.getItem(
                                                                "userData"
                                                            )
                                                        ).pendingFine
                                                    }
                                                </span>
                                            </li>
                                        ) : null}
                                    </ul>
                                </li>

                                <li onClick={logout}>
                                    <div className="profile">
                                        <MdLogout />
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <>
                        <p>
                            <Link to="/">
                                <ImLibrary />
                                &nbsp;&nbsp;LIBRARY
                            </Link>
                        </p>
                        <span></span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
