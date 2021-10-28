import React from "react";

// import "./header_member_style.css";

const faq_mem = () => {
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

export default faq_mem;
