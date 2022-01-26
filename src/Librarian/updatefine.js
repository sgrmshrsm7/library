import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

    const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/librarian/updatefine", {
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
            window.alert("Fine updated");
            history.push("/librarian/home");
        }
    };

    return (
        <div>
            <form className="loginform" method="POST" >
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

                <input 
                    type="submit" 
                    value="Update" 
                    name="m_login" 
                    onClick={loginUser} 
                />

            </form>
        </div>
    );
};

export default Updatefine_lib;
