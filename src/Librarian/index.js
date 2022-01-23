import React from "react";

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
                        name="id"
                        id="name"
                        placeholder="ID Number"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-pass"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>

                <input type="submit" value="Login" name="l_login" />
            </form>
        </div>
    );
};

export default index_lib;
