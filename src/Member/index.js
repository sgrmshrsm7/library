import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Member = () => {
    const [user, setUser] = useState({
        id: "",
        password: "",
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

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/member", {
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
            window.alert("Login Successful");
            localStorage.setItem("userData", JSON.stringify(data));
            history.push("/member/home");
        }
    };

    return (
        <div>
            <form className="loginform" method="POST">
                <div className="loginhead">Student Login</div>

                <div className="error-message" id="error-message">
                    <p id="error"></p>
                </div>

                <input
                    className="m-user"
                    type="text"
                    name="id"
                    id="id"
                    placeholder="ID Number"
                    onChange={handleInputs}
                    value={user.id}
                />

                <input
                    className="m-pass"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleInputs}
                    value={user.password}
                />

                <input
                    type="submit"
                    value="Login"
                    name="m_login"
                    onClick={loginUser}
                />
            </form>
        </div>
    );
};

export default Member;
