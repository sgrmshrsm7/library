import React, { useState } from "react";

// import "./header_member_style.css";

const Add_lib = () => {
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

    return (
        <div>
            <form className="loginform" method="GET" action="/member/home">
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

                <input type="submit" value="Add book" name="m_login" />
            </form>
        </div>
    );
};

export default Add_lib;
