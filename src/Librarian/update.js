import React from "react";

// import "./header_member_style.css";

const update_lib = () => {
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
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-pass"
                        type="password"
                        name="newpass"
                        id="newpass"
                        placeholder="New Password"
                    />
                </div>

                <br />
                <input type="submit" name="m_register" value="Update" />
            </form>
        </div>
    );
};

export default update_lib;
