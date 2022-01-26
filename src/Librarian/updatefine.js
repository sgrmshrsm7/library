import React, { useState } from "react";

// import "./header_member_style.css";

const Updatefine_lib = () => {
    const [user, setUser] = useState({
        id: "",
        newfine: "",
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
                <div className="loginhead">Update fine</div>

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
                        name="newfine"
                        id="newfine"
                        placeholder="New Fine"
                        onChange={handleInputs}
                        value={user.newfine}
                    />
                </div>

                <input type="submit" value="Update" name="m_login" />
            </form>
        </div>
    );
};

export default Updatefine_lib;
