import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const QuillEditor = ({ handleChangePost, value, quill, referencia }) => {

  return ( 
    <>
    <ReactQuill
    ref={referencia}
    className={quill}
    onChange={handleChangePost}
    defaultValue={value}
    theme="bubble"
    placeholder="Your post ..."
    //modules={modules}
    // formats={formats}
    />
    </>
  );
};

export default QuillEditor;
