import React from "react";

// import "./header_member_style.css";

const add_lib = () => {
    return (
			<div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Add New Book</div>

                <input type="submit" value="Add book" name="m_login" />
            </form>
        </div>

    );
};

export default add_lib;




