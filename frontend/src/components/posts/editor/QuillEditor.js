import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const QuillEditor = ({ handleChangePost, value, referencia }) => {

  return ( 
    <>
    <ReactQuill
    ref={referencia} 
    onChange={handleChangePost}
    defaultValue={value}
    theme="bubble"
    placeholder="Your post"
    />
    </>
  );
};

export default QuillEditor;
