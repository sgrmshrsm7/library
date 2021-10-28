import React from "react";

// import "./header_member_style.css";

const search_lib = () => {
    return (
			<div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Search Book</div>

                <input type="submit" value="Search By Name" name="m_login" />

                <input type="submit" value="Search Via Image" name="m_login" />
            </form>
        </div>

    );
};

export default search_lib;




