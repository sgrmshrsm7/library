import React from "react";

const index_member = () => {
    return (
        <div>
            <form className="loginform" method="POST" action="/member/home">
                <div className="loginhead">Student Login</div>

                <div className="error-message" id="error-message">
                    <p id="error"></p>
                </div>

                <input
                    className="m-user"
                    type="text"
                    name="id"
                    placeholder="ID Number"
                />

                <input
                    className="m-pass"
                    type="password"
                    name="password"
                    placeholder="Password"
                />

                <input type="submit" value="Login" name="m_login" />
            </form>
        </div>
    );
};

export default index_member;
