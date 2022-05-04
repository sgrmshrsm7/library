import React from "react";
import member from "./img/ic_member.svg";
import librarian from "./img/ic_librarian.svg";
import { CgProfile } from "react-icons/cg";
import { GiSchoolBag } from "react-icons/gi";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div id="allTheThings">
                <div id="member">
                    <Link to="member">
                        {/* <img src={member} width="250px" height="auto" /> */}
                        <span className="homelogo">
                            <GiSchoolBag />
                        </span>
                        <br />
                        &nbsp;Student
                    </Link>
                </div>
                <div id="verticalLine">
                    <div id="librarian">
                        <Link id="librarian-link" to="librarian">
                            {/* <img src={librarian} width="250px" height="auto" /> */}
                            <span className="homelogo">
                                <CgProfile />
                            </span>
                            <br />
                            &nbsp;&nbsp;&nbsp;Librarian
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
