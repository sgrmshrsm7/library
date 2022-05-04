import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

import QrReader from "react-qr-reader";

// import "./header_member_style.css";

const Reissue_mem = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    const [result, setResult] = useState("");
    const [id, setId] = useState();

    const handleScan = (data) => {
        if (data) {
            setResult(parseInt(data.slice(2)));
        }
    };
    const handleError = (err) => {
        console.error(err);
    };
    const clearqr = () => {
        setResult("");
    };
    const submitqr = async (e) => {
        e.preventDefault();
        const res = await fetch("/member/reissue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, bookid: result }),
        });
        const data = await res.json();
        if (
            !data ||
            data.error ||
            res.status === 400 ||
            res.status === 404 ||
            res.status === 422
        ) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Successfully Reissued");
            history.push("/member/home");
        }
    };

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
            setId(data.id);
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
            <div className="loginform">
                <div className="loginhead">Reissue Book</div>
                <div className="scanner">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                    />
                </div>
                {result != "" ? (
                    <>
                        <p className="scannedbook">ID of Book: {result}</p>
                        <div className="qrbuttons">
                            <div className="qrscanbutton" onClick={clearqr}>
                                Clear QR
                            </div>
                            <div className="qrscanbutton" onClick={submitqr}>
                                Confirm QR
                            </div>
                        </div>
                    </>
                ) : null}

                {/* <input type="submit" value="Scan QR code" name="m_login" /> */}
            </div>
        </div>
    );
};

export default Reissue_mem;
