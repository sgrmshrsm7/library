import React from "react";

const returnbook = () => {
    return (
        <div>
            {/* change to POST */}
            <form class="loginform" method="GET" action="/member">
                <div className="loginhead">Return Book</div>

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
                        name="bookid"
                        id="bookid"
                        placeholder="ID of Book"
                    />
                </div>

                <br />
                <input type="submit" name="m_register" value="Return" />
            </form>
        </div>
    );
};

export default returnbook;
