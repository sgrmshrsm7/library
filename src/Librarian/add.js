import React from "react";

// import "./header_member_style.css";

const add_lib = () => {
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
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="qrdata"
                        id="qrdata"
                        placeholder="QR Data"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="edition"
                        id="edition"
                        placeholder="Edition"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="author"
                        id="author"
                        placeholder="Author"
                    />
                </div>

                <div class="icon">
                    <input
                        class="l-user"
                        type="text"
                        name="publication"
                        id="publication"
                        placeholder="Publication"
                    />
                </div>

                <input type="submit" value="Add book" name="m_login" />
            </form>
        </div>

    );
};

export default add_lib;




