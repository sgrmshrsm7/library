import React, { useState } from "react";

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
    return (
        <div>
            <form className="loginform" method="GET" action="/member/home">
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

                <input type="submit" value="Login" name="m_login" />
            </form>
        </div>
    );
};

export default Member;
