import React, {useState} from "react";
import Button from "@mui/material/Button";
import "./ImageUpload.css"

function ImageUpload() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {

    }
    return (
        <div className="imageupload">
            <input type = "text"
                   placeholder = "Enter a caption"
                   onChange={(event) => setCaption(event.target.value)}
                   value={caption}
            />
            <input
            type = "file"
            id = "fileInput"
            onChange={handleChange}
            />
            <Button classname="imageupload_button" onClick ={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;