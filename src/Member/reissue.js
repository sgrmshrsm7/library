import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

// import "./header_member_style.css";

const Reissue_mem = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

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

            // console.log(userData);
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            const data = await res.json();

            dispatch({
                type: "USER",
                payload: true,
            });
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
