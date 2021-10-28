import React from "react";

// import "./header_member_style.css";

const updatefine_lib = () => {
    return (
			<div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Update fine</div>

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
                        placeholder="New Fine"
                    />
                </div>

                <input type="submit" value="Update" name="m_login" />
            </form>
        </div>

    );
};

export default updatefine_lib;