import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

// import "./header_member_style.css";

const Add_lib = () => {
    const { state, dispatch } = useContext(UserContext);

    const [user, setUser] = useState({
        id: "",
        qrdata: "",
        name: "",
        edition: "",
        author: "",
        publication: "",
    });

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
            const res = await fetch("/librarian/add", {
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
        const res = await fetch("/librarian/add", {
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
            window.alert("Book added");
            history.push("/librarian/home");
        }
    };

    return (
        <div>
            <form className="loginform" method="POST">
                <div className="loginhead">Add New Book</div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="id"
                        id="id"
                        placeholder="ID Number"
                        onChange={handleInputs}
                        value={user.id}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="qrdata"
                        id="qrdata"
                        placeholder="QR Data"
                        onChange={handleInputs}
                        value={user.qrdata}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange={handleInputs}
                        value={user.name}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="edition"
                        id="edition"
                        placeholder="Edition"
                        onChange={handleInputs}
                        value={user.edition}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="author"
                        id="author"
                        placeholder="Author"
                        onChange={handleInputs}
                        value={user.author}
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="publication"
                        id="publication"
                        placeholder="Publication"
                        onChange={handleInputs}
                        value={user.publication}
                    />
                </div>

                <input
                    type="submit"
                    value="Add book"
                    name="m_login"
                    onClick={loginUser}
                />
            </form>
        </div>
    );
};

export default Add_lib;
