import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Lib_home = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const callMemberHome = async () => {
        try {
            const res = await fetch("/librarian/home", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            const data = await res.json();
            localStorage.setItem("userData", JSON.stringify(data));
            dispatch({
                type: "USER",
                payload: true,
            });
        } catch (error) {
            console.log(error);
            history.push("/librarian");
        }
    };

    useEffect(() => {
        callMemberHome();
    }, []);
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

            <Link to="/librarian/answerfaq">
                <div className="libHomeButton">Answer FAQ</div>
            </Link>
            {/* <Link to="/search">
                <div className="libHomeButton">Availability Of A Book</div>
            </Link> */}
        </div>
    );
};

export default Lib_home;
