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
                    name="id"
                    id="id"
                    placeholder="ID Number"
                />

                <input
                    className="m-pass"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />

                <input type="submit" value="Login" name="m_login" />
            </form>
        </div>
    );
};

export default index_member;
