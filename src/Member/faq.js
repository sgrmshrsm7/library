import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";

import Faq from "react-faq-component";

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

    const faqdata = {
        title: "FAQ",
        rows: [
            {
                title: (
                    <b>
                        How much is the fine for each book if we fail to renew
                        on time?
                    </b>
                ),
                content:
                    "The overdue fine is five rupees per item per day for general books and ten rupees per day for reference books.",
            },
            {
                title: <b>What if I lose or damage something I borrow?</b>,
                content:
                    "If library material is lost, replacement cost, determined by the library will have to be paid by the member. The library cannot accept replacement items in lieu of lost items. Items returned with damage that warrants withdrawal from the collection will be treated as lost.",
            },

            {
                title: (
                    <b>
                        What are the suggested books for CSE students for GATE?
                    </b>
                ),
                content: (
                    <div>
                        I read mostly the standard text books for the concepts
                        and then solved the questions from other books.Following
                        is a list of textbooks which I read (The spellings of
                        the authors could be wrong . Do verify it from other
                        sources) :<br />
                        <ul className="faqul">
                            <li>
                                <b>Data structures :</b> Schaum series,
                                karumanchi
                            </li>
                            <li>
                                <b>Algorithms :</b> Coreman. ( It may be
                                difficult to read initially but this is the best
                                book)
                            </li>
                            <li>
                                <b>TOC :</b> Only referred to notes and PDFs.
                                Book usually followed is Ullman , Peterlinz
                            </li>
                            <li>
                                <b>Compilers design :</b> Aho, Ullman, Sethi (
                                the writing is quite easy to grasp and the
                                content is very good)
                            </li>
                            <li>
                                <b>OS :</b> Silberschatz and Galvin
                            </li>
                            <li>
                                <b>DBMS :</b> Navathe ( transactions and
                                concurrency control, normal forms , SQL ) and ER
                                diagram from Korth and Sudarshan
                            </li>
                            <li>
                                <b>CSA :</b> Morris Mano ( not so good because
                                topics were explained in a concise form. I
                                studied this subject mostly from the notes
                                provided by my Sir. Also I saw various video
                                lectures on pipelining, Datapath and control
                                path )
                            </li>
                            <li>
                                <b>DLD :</b> Morris Mano
                            </li>
                            <li>
                                <b>Discrete Structure:</b> S. Chand ( other
                                books are also there but since I started this
                                subject towards the end so I didn't had much
                                time)
                            </li>
                            <li>
                                <b>Maths :</b> mostly solved previous years'
                                questions of all branches and referred to notes
                                , BS Grewal for probability distribution, system
                                of linear equations
                            </li>
                            <li>
                                <b>Computer Networks :</b> Forouzan or
                                Tannenbaum whichever you like. In this subject a
                                book is a must read because this according to me
                                was the most confusing subject. Data link layer
                                , network and transport layer have been
                                explained beautifully in Forouzan.
                            </li>
                            <li>
                                <b>C :</b> Mostly previous years’ questions. Any
                                book of your choice can be used( Yashwant
                                Kanetkar)
                            </li>
                            .
                        </ul>
                        Hope it helps :)
                    </div>
                ),
            },
            {
                title: (
                    <b>
                        What are some of the best general knowledge books for
                        competitive exams?
                    </b>
                ),
                content: (
                    <div>
                        Some of the best General Knowledge (GK) books for
                        competitive exams are as follows:
                        <ul className="faqul">
                            <li>Manorama Yearbook.</li>
                            <li>Lucent’s General Knowledge</li>
                            <li>The Pearson Concise GK Manual</li>
                            <li>General Knowledge 2022 - Arihant Pandey</li>
                            <li>
                                Rapid General Knowledge 2021 for Competitive
                                Exams by Disha Experts
                            </li>
                            <li>
                                Newspapers like The Economics Times, The Hindu,
                                The Business Standards, The Times of India, etc.
                                for current affairs, etc.
                            </li>
                        </ul>
                    </div>
                ),
            },
            {
                title: (
                    <b>
                        Let us C or Dennis Ritchie, which is better for a
                        beginner in C?
                    </b>
                ),
                content: (
                    <div>
                        If the choice is between these two, start with Kernighan
                        and Ritchie: The C Programming Language. And do not go
                        anywhere near any textbook that assumes you're using
                        Borland Turbo C. It was a solid C compiler - in 1995. If
                        you must develop on Windows, try to use Code::Blocks and
                        the Clang compiler (although GCC is good too), so you
                        can at least be in the right century as far as your
                        compilers go :)
                    </div>
                ),
            },
            {
                title: <b>What books should mechanical engineers read?</b>,
                content: (
                    <div>
                        6 Mechanical Engineering Books Worth Keeping
                        <ul className="faqul">
                            <li>
                                Marks Standard Handbook for Mechanical
                                Engineers.
                            </li>
                            <li>Shigley's Mechanical Engineering Design.</li>
                            <li>Standard Handbook of Machine Design.</li>
                            <li>Machinery's Handbook.</li>
                            <li>
                                Materials Science and Engineering: An
                                Introduction.
                            </li>
                            <li>
                                DeGarmo's Materials and Processes in
                                Manufacturing.
                            </li>
                        </ul>
                    </div>
                ),
            },
            {
                title: (
                    <b>
                        What are some great books on entrepreneurship and
                        start-ups?
                    </b>
                ),
                content: (
                    <ul className="faqul">
                        <li>The Lean Startup By Eric Ries</li>
                        <li>Zero to One By Peter Thiel</li>
                        <li>Shoe Dog By Phil Knight</li>
                        <li>Rich Dad Poor Dad By Robert Kiyosaki</li>
                        <li>The $100 Startup By Chris Guillebeau</li>
                    </ul>
                ),
            },
            {
                title: (
                    <b>What are some of the greatest self improvement books?</b>
                ),
                content: (
                    <ul className="faqul">
                        <li>Think and Grow rich</li>
                        <li>The power of your subconscious mind</li>
                        <li>Who moved my cheese?</li>
                        <li>Who will cry when you die?</li>
                        <li>How to win friends and influence people</li>
                    </ul>
                ),
            },
        ],
    };

    const styles = {
        bgColor: "#eee",
        titleTextColor: "#25d0ff",
        rowTitleColor: "#2b3e51",
        rowContentColor: "#2b3e51",
        // arrowColor: "red",
        titleTextSize: "40pt",
        rowTitleTextSize: "20pt",
        rowContentTextSize: "15pt",
        rowContentPaddingBottom: "20px",
        rowContentPaddingRight: "50px",
        rowContentPaddingLeft: "13px",
    };

    const config = {
        // animate: true,
        // arrowIcon: "V",
        // tabFocus: true
    };

    return (
        <div className="faqsection">
            {/*<h1 className="loginhead">FAQ'S</h1>
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
            </div> */}
            <Faq data={faqdata} styles={styles} config={config} />
        </div>
    );
};

export default Faq_mem;
