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
                        name="m_user"
                        id="m_user"
                        placeholder="Username"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-pass"
                        type="password"
                        name="m_pass"
                        placeholder="Password"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-name"
                        type="text"
                        name="m_name"
                        placeholder="Full Name"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-email"
                        type="email"
                        name="m_email"
                        id="m_email"
                        placeholder="Email"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-balance"
                        type="number"
                        name="m_balance"
                        id="m_balance"
                        placeholder="Initial Balance"
                    />
                </div>

                <br />
                <input type="submit" name="m_register" value="Update" />
            </form>
        </div>
    );
};

export default update_lib;



