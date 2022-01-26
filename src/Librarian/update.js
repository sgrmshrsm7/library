import React, { useState } from "react";

// import "./header_member_style.css";

const Update_lib = () => {
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
    return (
        <div>
            {/* change to POST */}
            <form class="loginform" method="GET" action="/member">
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
                <input type="submit" name="m_register" value="Update" />
            </form>
        </div>
    );
};

export default Update_lib;
