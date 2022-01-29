import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Home_member = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        id: 0,
        booksIssued: [],
        pendingFine: 0,
        yearOfJoining: 0,
        email: "",
    });

    const callMemberHome = async () => {
        try {
            const res = await fetch("/member/home", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            // console.log(userData);
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            const data = await res.json();
            localStorage.setItem("userData", JSON.stringify(data));
            setUserData(data);
        } catch (error) {
            console.log(error);
            history.push("/member");
        }
    };

    useEffect(() => {
        callMemberHome();
    }, []);
    return (
        <div className="studentHome">
            <div className="loginhead">Issued books</div>
            <div class="error-message" id="error-message">
                <p id="error"></p>
            </div>
            <table width="90%" cellpadding="10" cellspacing="10">
                <tr>
                    <th></th>
                    <th>
                        Name of book<hr></hr>
                    </th>
                    <th>
                        Edition<hr></hr>
                    </th>
                    <th>
                        Author<hr></hr>
                    </th>
                    <th>
                        Publication<hr></hr>
                    </th>
                    <th>
                        Due Date<hr></hr>
                    </th>
                </tr>

                {userData.booksIssued.map((val) => {
                    return (
                        <tr>
                            <td></td>
                            <td>{val.name}</td>
                            <td className="cellcenter">{val.edition}</td>
                            <td>{val.author}</td>
                            <td>{val.publication}</td>
                            <td className="cellcenter">
                                {val.duedate.substring(0, 10)}
                            </td>
                        </tr>
                    );
                })}
            </table>

            <div className="studentButtons">
                <Link to="/member/reissue">
                    <div className="studHomeButton">Reissue books</div>
                </Link>
                {/* <Link to="/search">
                    <div className="studHomeButton">Search Book</div>
                </Link> */}
                <Link to="/faq">
                    <div className="studHomeButton">FAQ</div>
                </Link>
            </div>
        </div>
    );
};

export default Home_member;
