import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ActionKind, usePony } from "pony-props";

const Home_member = () => {
    const [rbooks, setRbooks] = useState(0);
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        id: 0,
        booksIssued: [],
        pendingFine: 0,
        yearOfJoining: 0,
        email: "",
    });

    const { state, dispatch } = useContext(UserContext);

    const callMemberHome = async () => {
        try {
            const res = await fetch("/member/home", {
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
            localStorage.setItem("userData", JSON.stringify(data.user));
            setUserData(data.user);
            setRbooks(data.rbooks);
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

    const MyCarousel = () => {
        const items = new Array(rbooks.length).fill(null).map((_, idx) => ({
            id: idx,
            ...rbooks[idx],
        }));

        const {
            getSectionProps,
            getHeadingProps,
            getCarouselWrapperProps,
            getCarouselProps,
            getCarouselItemProps,
            getButtonProps,
            getAnnouncerProps,
            state,
        } = usePony({ numItems: items.length });

        return (
            <div {...getSectionProps()}>
                <div className="ramesh">
                    <h1 {...getHeadingProps()}></h1>
                    <div {...getButtonProps(ActionKind.Previous)}>
                        <div className="rbooksbutton">{"<"}</div>
                    </div>
                    <div {...getCarouselWrapperProps()}>
                        <ul {...getCarouselProps()}>
                            {items.map((item, idx) => (
                                <li key={idx} {...getCarouselItemProps(idx)}>
                                    <div className="rbook">
                                        <div className="bookname">
                                            {item.name}
                                        </div>
                                        <div>
                                            <b>ID:</b> {item.id}
                                        </div>
                                        <div>
                                            <b>Edition:</b> {item.edition}
                                        </div>
                                        <div>
                                            <b>Author:</b> {item.author}
                                        </div>
                                        <div>
                                            <b>Publication:</b>{" "}
                                            {item.publication}
                                        </div>
                                        {item.status ? (
                                            <div>
                                                <b>Not Available</b>
                                            </div>
                                        ) : (
                                            <div>
                                                <b>Available</b>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div {...getButtonProps(ActionKind.Next)}>
                        <div className="rbooksbutton">{">"}</div>
                    </div>
                    <div {...getAnnouncerProps()}>
                        <p>{`Item ${state.activeSlideIndex + 1} of ${
                            items.length
                        }`}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="studentHome">
            {userData.booksIssued.length === 0 ? (
                <p className="nobookissued">No books issued</p>
            ) : (
                <>
                    <div className="loginhead">Issued books</div>
                    <table width="90%" cellpadding="10" cellspacing="10">
                        <tr>
                            <th></th>
                            <th>
                                Name of book<hr></hr>
                            </th>
                            <th>
                                Edition<hr></hr>
                            </th>
                            <th>
                                Author<hr></hr>
                            </th>
                            <th>
                                Publication<hr></hr>
                            </th>
                            <th>
                                Due Date<hr></hr>
                            </th>
                        </tr>

                        {userData.booksIssued.map((val) => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{val.name}</td>
                                    <td className="cellcenter">
                                        {val.edition}
                                    </td>
                                    <td>{val.author}</td>
                                    <td>{val.publication}</td>
                                    <td className="cellcenter">
                                        {val.duedate.substring(0, 10)}
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </>
            )}

            <hr />

            {rbooks != 0 ? (
                <div className="rbooks">
                    <div className="rhead">Recommendations</div>
                    <div className="ramesh">
                        <MyCarousel />
                    </div>
                </div>
            ) : null}

            <div className="studentButtons">
                <Link to="/member/reissue">
                    <div className="studHomeButton">Reissue books</div>
                </Link>
                {/* <Link to="/search">
                    <div className="studHomeButton">Search Book</div>
                </Link> */}
                <Link to="/faq">
                    <div className="studHomeButton">FAQ</div>
                </Link>
            </div>
        </div>
    );
};

export default Home_member;
