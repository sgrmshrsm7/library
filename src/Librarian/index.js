import React, { useState } from "react";

const Lib = () => {
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
            <form class="loginform" method="GET" action="librarian/home">
                <div className="loginhead">Librarian Login</div>

                <div class="error-message" id="error-message">
                    <p id="error"></p>
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="id"
                        id="name"
                        placeholder="ID Number"
                        onChange={handleInputs}
                        value={user.id}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-pass"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleInputs}
                        value={user.password}
                    />
                </div>

                <input type="submit" value="Login" name="l_login" />
            </form>
        </div>
    );
};

export default Lib;
