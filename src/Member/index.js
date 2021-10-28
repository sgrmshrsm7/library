import React from "react";

const index_member = () => {
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
                    name="m_user"
                    placeholder="Username"
                />

                <input
                    className="m-pass"
                    type="password"
                    name="m_pass"
                    placeholder="Password"
                />

                <input type="submit" value="Login" name="m_login" />
            </form>
        </div>
    );
};

export default index_member;
