import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
// import "./header_member_style.css";

const Search_name = () => {
    const [user, setUser] = useState({
        name: "",
    });

    const [books, setBooks] = useState(0);

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    //const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/search/searchbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (
            !data ||
            data.error ||
            res.status === 400 ||
            res.status === 404 ||
            res.status === 422
        ) {
            window.alert("No book found");
        } else {
            setBooks(data);
            if (data.length === 0) {
                window.alert("No Book found");
            }
            //history.push("/librarian/home");
        }
    };

    return (
        <div>
            <form className="loginform" method="POST">
                <div className="loginhead">Search Book</div>

                <input
                    className="m-user"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of Book"
                    onChange={handleInputs}
                    value={user.name}
                />

                <input
                    type="submit"
                    value="Search"
                    name="s_sumbit"
                    onClick={loginUser}
                />
                {books != 0 ? (
                    <>
                        <div className="bookresulthead">
                            <BiSearchAlt /> &nbsp;{books.length} results found
                        </div>
                        <div className="books">
                            {books.map((val) => {
                                return (
                                    <div className="book">
                                        <div className="bookname">
                                            {val.name}
                                        </div>
                                        <div>
                                            <b>ID:</b> {val.id}
                                        </div>
                                        <div>
                                            <b>Edition:</b> {val.edition}
                                        </div>
                                        <div>
                                            <b>Author:</b> {val.author}
                                        </div>
                                        <div>
                                            <b>Publication:</b>{" "}
                                            {val.publication}
                                        </div>
                                        {val.status ? (
                                            <div>
                                                <b>Not Available</b>
                                            </div>
                                        ) : (
                                            <div>
                                                <b>Available</b>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>{" "}
                    </>
                ) : null}
            </form>
        </div>
    );
};

export default Search_name;
