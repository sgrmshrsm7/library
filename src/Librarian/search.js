import React from "react";
import { Link } from "react-router-dom";

// import "./header_member_style.css";

const search_lib = () => {
    return (
			<div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Search Book</div>

                <Link to="/librarian/search/searchbook">
                    <div className="libHomeButton">Search By Name</div>
                </Link>

                <Link to="/librarian/search/searchbookimg">
                    <div className="libHomeButton">Search By Image</div>
                </Link>

                
            </form>
        </div>

    );
};

export default search_lib;




