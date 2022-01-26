import React, { useState } from "react";

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
                    onChange={handleInputs}
                    value={user.name}
                />

                <input type="submit" value="Search" name="s_sumbit" />
            </form>
        </div>
    );
};

export default Search_name;
