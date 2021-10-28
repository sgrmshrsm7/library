import React from "react";

import "./header_librarian_style.css";

const index_lib = () => {
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
                        name="l_user"
                        placeholder="Username"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-pass"
                        type="password"
                        name="l_pass"
                        placeholder="Password"
                    />
                </div>

                <input type="submit" value="Login" name="l_login" />
            </form>
        </div>
    );
};

export default index_lib;
