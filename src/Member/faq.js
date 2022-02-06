import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Faq_mem = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const callMemberHome = async () => {
        try {
            const res = await fetch("/faq", {
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
            history.push("/");
        }
    };

    useEffect(() => {
        callMemberHome();
    }, []);

    return (
        <div className="faqsection">
            <h1 className="loginhead">FAQ'S</h1>
            <div className="faq-container">
                <div className="faq-one">
                    <h1 className="faq-page">
                        How much is the fine for each book if we fail to renew
                        on time ?
                    </h1>

                    <div className="faq-body">
                        <p>
                            On each book student get a penalty of 10 INR on each
                            period delay.
                        </p>
                    </div>
                </div>

                <div className="faq-two">
                    <h1 className="faq-page">
                        What site we can refer to for basic HTML course ?
                    </h1>

                    <div className="faq-body">
                        <p>
                            There are numerous sites but "W3schools" is prefered
                            by most of the students.
                        </p>
                    </div>
                </div>

                <div className="faq-three">
                    <h1 className="faq-page">
                        What book is prefered for C Programming ?
                    </h1>

                    <div className="faq-body">
                        <p>Let Us C by Yashavant Kanetkar.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq_mem;
