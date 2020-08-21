import axios from "axios";
import { insertMedia } from "./insertMedia";

export const addImage = async (e,args) => {
    const {setPreviewLoading, token, quillRef, values, setValues } = args;
    const image = e.target.files[0];
    const previewImage = new FormData(); 
    previewImage.append("image", image);
    setPreviewLoading(true);
    const response = await axios.post("http://localhost:5001/posts/imagePreview", previewImage, { headers: { "auth-token": token, "Content-Type": "multipart/form-data" } }); 
    setPreviewLoading(false);
    const preview = response.data.preview;
    // inserta la imagen en el editor
    insertMedia(quillRef.current, preview, image.name)
    setValues({...values, media: response.data.preview, mediaAlt: image.name})
  };