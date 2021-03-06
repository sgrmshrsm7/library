import React from "react";
import { Link } from "react-router-dom";

// import "./header_member_style.css";

const Search_mem = () => {
    return (
        <div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Search Book</div>

                <Link to="/search/searchbook">
                    <div className="searchButton">Search By Name</div>
                </Link>

                <Link to="/search/searchbookimg">
                    <div className="searchButton">Search By Image</div>
                </Link>
            </form>
        </div>
    );
};

export default Search_mem;
