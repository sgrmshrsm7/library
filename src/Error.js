import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="ErrorPage">
                <div className="error404">404 Page Not Found!</div>
                <Link to="/">
                    <div className="errorbutton">
                        <BsFillArrowLeftCircleFill />
                        <span className="backtext">Go Back</span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Error;
