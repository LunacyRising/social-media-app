import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useTranslation } from "react-i18next";

const QuillEditor = ({ handleChangePost, value, quillRef }) => {

  const { t } = useTranslation();

  return ( 
    <>
    <ReactQuill
    ref={quillRef} 
    onChange={handleChangePost}
    defaultValue={value}
    theme="bubble"
    placeholder={t("YourPost")}
    />
    </>
  );
};

export default QuillEditor;
