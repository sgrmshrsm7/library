import React, { useState } from "react";
//import { useHistory } from "react-router-dom";

// import "./header_member_style.css";

const Search_name = () => {
    const [user, setUser] = useState({
        name: "",
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

    //const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/librarian/searchbook", {
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
            window.alert("Book issued");
            //history.push("/librarian/home");
        }
    };

    return (
        <div>
            <form className="loginform" method="POST" >
                <div className="loginhead">Search Book</div>

                <input
                    className="m-user"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of Book"
                    onChange={handleInputs}
                    value={user.name}
                />

                <input type="submit" value="Search" name="s_sumbit" onClick={loginUser} />
            </form>
        </div>
    );
};

export default Search_name;
