import React from "react";

// import "./header_member_style.css";

const reissue_mem = () => {
    return (
			<div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Reissue Book</div>

                <input type="submit" value="Scan QR code" name="m_login" />
            </form>
        </div>

    );
};

export default reissue_mem;



