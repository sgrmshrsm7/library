import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// import "./header_member_style.css";

const Reissue_mem = () => {
    const history = useHistory();

    const callMemberHome = async () => {
        try {
            const res = await fetch("/member/reissue", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
            history.push("/member");
        }
    };

    useEffect(() => {
        callMemberHome();
    }, []);
    return (
        <div>
            <form className="loginform" method="GET" action="/member/home">
                <div className="loginhead">Reissue Book</div>

                <input type="submit" value="Scan QR code" name="m_login" />
            </form>
        </div>
    );
};

export default Reissue_mem;
