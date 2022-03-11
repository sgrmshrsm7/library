import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
// import camera from "./camera.js";
import { createWorker } from "tesseract.js";
import img from "../img/chintu.png";

const Search_img = () => {
    const [text, setText] = useState("");
    const worker = createWorker({
        logger: (m) => console.log(m),
    });
    try {
        (async () => {
            await worker.load();
            await worker.loadLanguage("eng");
            await worker.initialize("eng");
            const {
                data: { texttemp },
            } = await worker.recognize(img);
            console.log(texttemp);
            setText(texttemp);
            await worker.terminate();
        })();
    } catch (error) {
        console.log(error);
    }

    return <>Text = {text}</>;
};

export default Search_img;
