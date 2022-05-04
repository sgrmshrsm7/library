import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    createRef,
} from "react";
import { BiSearchAlt } from "react-icons/bi";
import Webcam from "react-webcam";
import axios from "axios";
import { Header, Grid, Button, Icon, Message, Loader } from "semantic-ui-react";

const Search_img = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [textOcr, setTextOcr] = useState(null);
    const [load, setLoad] = useState(false);
    const [books, setBooks] = useState(0);
    let fileInputRef = createRef();

    const capture = useCallback(() => {
        setLoad(true);
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(imageSrc)
        let url = "http://localhost:5000/capture";
        let config = {
            headers: { "Content-Type": "application/json" }, // x-www-form-urlencoded
        };
        let dataBody = {
            img: imageSrc,
        };
        axios
            .post(url, dataBody, config)
            .then((res) => {
                console.log(res.data);
                setTextOcr(res.data.text);
                setImgSrc(imageSrc);
                setLoad(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [webcamRef, setImgSrc]);

    const upload = (file) => {
        setLoad(true);
        var url = "http://localhost:5000/upload";
        var formData = new FormData();
        formData.append("file", file);
        var config = {
            headers: { "Content-Type": "application/json" },
        };
        return axios.post(url, formData, config).then((res) => {
            console.log(res.data);
            setTextOcr(res.data.text);
            setImgSrc(res.data.image);
            setLoad(false);
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/search/searchbookimg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: textOcr.toString() }),
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
            // console.log(data);
            if (data.length === 0) {
                window.alert("No Book returned");
            }
            //history.push("/librarian/home");
        }
    };

    return (
        <>
            <div className="searchimage">
                <div className="pehlabaxa">
                    <center>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                        <div className="searchimgbuttons">
                            <div className="studHomeButton" onClick={capture}>
                                Capture
                            </div>
                            <div
                                className="studHomeButton"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Upload
                                <form encType="multipart/form-data">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        hidden
                                        name="filename"
                                        onChange={(x) => {
                                            upload(x.target.files[0]);
                                        }}
                                        accept="image/*"
                                    />
                                </form>
                            </div>
                        </div>
                    </center>

                    {books != 0 ? (
                        <>
                            <div className="bookresulthead">
                                <BiSearchAlt /> &nbsp;{books.length} results
                                found
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
                </div>

                <div className="dusrabaxa">
                    {load ? (
                        <div className="loading">Loading...</div>
                    ) : imgSrc ? (
                        <>
                            <div className="searchimgresult"> Result </div>
                            <img alt="captured" src={imgSrc} />
                            <form method="POST">
                                <input
                                    className="searchimgresult1"
                                    value={textOcr}
                                    onChange={(e) => setTextOcr(e.target.value)}
                                />
                                <div className="searchimgbutton">
                                    <input
                                        type="submit"
                                        value="Search"
                                        name="s_sumbit"
                                        onClick={loginUser}
                                    />
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="searchimgresult">No data preview</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search_img;
