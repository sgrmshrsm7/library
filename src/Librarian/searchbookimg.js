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
            headers: { "Content-Type": "multipart/form-data" },
        };
        return axios.post(url, formData, config).then((res) => {
            console.log(res.data);
            setTextOcr(res.data.text);
            setImgSrc(res.data.image);
            setLoad(false);
        });
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
                            {/* <Button
                                size="big"
                                onClick={capture}
                                style={{ margin: 20 }}
                                icon
                                labelPosition="left"
                                inverted
                                color="green"
                            >
                                <Icon name="camera" />
                                Capture
                            </Button> */}
                            <div className="studHomeButton" onClick={capture}>
                                Capture
                            </div>

                            {/* <Button
                                size="big"
                                onClick={() => fileInputRef.current.click()}
                                style={{ margin: 20 }}
                                icon
                                labelPosition="left"
                                inverted
                                color="blue"
                            > */}
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
                </div>

                <div className="dusrabaxa">
                    {load ? (
                        <div className="loading">Loading...</div>
                    ) : imgSrc ? (
                        <>
                            <div className="searchimgresult"> Result </div>
                            <img alt="captured" src={imgSrc} />

                            <div className="searchimgresult1">{textOcr}</div>
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
