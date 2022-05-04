import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import "./header_member_style.css";

import { UserContext } from "../App";
import { useContext } from "react";

const Update_lib = () => {
    const { state, dispatch } = useContext(UserContext);

    const [user, setUser] = useState({
        id: "",
        newpass: "",
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const history = useHistory();

    const callMemberHome = async () => {
        try {
            const res = await fetch("/librarian/update", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            // console.log(userData);
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            const data = await res.json();

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

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/librarian/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (
            !data ||
            data.error ||
            res.status === 400 ||
            res.status === 404 ||
            res.status === 422
        ) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Password updated");
            history.push("/librarian/home");
        }
    };

    return (
        <div>
            {/* change to POST */}
            <form class="loginform" method="POST">
                <div className="loginhead">Update Details</div>

                <div class="error-message" id="error-message">
                    <p id="error"></p>
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="id"
                        id="id"
                        placeholder="ID Number"
                        onChange={handleInputs}
                        value={user.id}
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-pass"
                        type="password"
                        name="newpass"
                        id="newpass"
                        placeholder="New Password"
                        onChange={handleInputs}
                        value={user.newpass}
                    />
                </div>

                <br />
                <input
                    type="submit"
                    name="m_register"
                    value="Update"
                    onClick={loginUser}
                />
            </form>
        </div>
    );
};

export default Update_lib;
