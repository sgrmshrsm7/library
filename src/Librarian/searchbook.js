import React from "react";

// import "./header_member_style.css";

const searchbook = () => {
    return (
        <div>
            <form className="loginform" method="GET" action="/librarian/search">
                <div className="loginhead">Search Book</div>

                <input
                    className="m-user"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of Book"
                />

                <input type="submit" value="Search" name="s_sumbit" />
            </form>
        </div>
    );
};

export default searchbook;
