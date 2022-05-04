import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

// import "./header_member_style.css";

const Ansfaq = () => {
    const { state, dispatch } = useContext(UserContext);

    const [user, setUser] = useState({
        ques: "",
        ans: "",
    });

    const [unquestions, setUnquestions] = useState([]);

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const history = useHistory();

    const callMemberHome = async () => {
        try {
            const res = await fetch("/librarian/answerfaq", {
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
            setUnquestions(data);

            dispatch({
                type: "USER",
                payload: true,
            });
        } catch (error) {
            console.log(error);
            history.push("/librarian");
        }
    };

    useEffect(() => {
        callMemberHome();
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/librarian/answerfaq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (
            !data ||
            data.error ||
            res.status === 400 ||
            res.status === 404 ||
            res.status === 422
        ) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Question answered");
            history.push("/librarian/answerfaq");
        }
    };

    return (
        <div>
            {unquestions.length > 0 ? (
                <table width="90%" cellpadding="10" cellspacing="10">
                    <tr>
                        <th></th>
                        <th>
                            Student ID<hr></hr>
                        </th>
                        <th>
                            Question<hr></hr>
                        </th>
                    </tr>

                    {unquestions.map((val) => {
                        return (
                            <tr>
                                <td></td>
                                <td>{val.studid}</td>
                                <td>{val.ques}</td>
                            </tr>
                        );
                    })}
                </table>
            ) : (
                <div className="noquestion">No unanswered Questions!</div>
            )}

            <form className="loginform" method="POST">
                <div className="loginhead">Answer Question</div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="ques"
                        id="ques"
                        placeholder="Enter Question"
                        onChange={handleInputs}
                        value={user.ques}
                    />
                </div>

                <div class="icon">
                    <textarea
                        class="l-user"
                        type="text"
                        name="ans"
                        id="ans"
                        placeholder="Answer"
                        onChange={handleInputs}
                        value={user.ans}
                    />
                </div>

                <input
                    type="submit"
                    value="Answer Question"
                    name="m_login"
                    onClick={loginUser}
                />
            </form>
        </div>
    );
};

export default Ansfaq;
