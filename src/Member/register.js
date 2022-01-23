import React from "react";

//import "./header_librarian_style.css";

const mem_reg = () => {
    return (
        <div>
            {/* change to POST */}
            <form class="loginform" method="GET" action="/member">
                <div className="loginhead">Enter Details</div>

                <div class="error-message" id="error-message">
                    <p id="error"></p>
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="id"
                        id="id"
                        placeholder="ID Number"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Student Name"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-pass"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="yearOfJoining"
                        id="yearOfJoining"
                        placeholder="Year Of Joining"
                    />
                </div>

                <div class="icon">
                    <input
                        class="m-user"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>


                <br />
                <input type="submit" name="m_register" value="Register" />
            </form>
        </div>
    );
};

export default mem_reg;
