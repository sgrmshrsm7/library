import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//import "./header_librarian_style.css";

const Register_member = () => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        password: "",
        yearOfJoining: "",
        email: "",
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
        const res = await fetch("/register", {
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
            window.alert("New Student Registered");
            history.push("/librarian/home");
        }
    };

    return (
        <div>
            {/* change to POST */}
            <form class="loginform" method="POST">
                <div className="loginhead">Enter Details</div>

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
                        class="m-user"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Student Name"
                        onChange={handleInputs}
                        value={user.name}
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-pass"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleInputs}
                        value={user.password}
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="yearOfJoining"
                        id="yearOfJoining"
                        placeholder="Year Of Joining"
                        onChange={handleInputs}
                        value={user.yearOfJoining}
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleInputs}
                        value={user.email}
                    />
                </div>

                <br />
                <input
                    type="submit"
                    name="m_register"
                    value="Register"
                    onClick={loginUser}
                />
            </form>
        </div>
    );
};

export default Register_member;
