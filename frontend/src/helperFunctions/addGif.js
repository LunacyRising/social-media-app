

export const addGif = (args) => {
    console.log("args", args)
    const { gif, title, quillRef, values, setValues, setGifstMenuOpen } = args;
    const quill = quillRef.current.getEditor(); 
    quill.focus();
    const range = quill.getSelection();
    let position = range ? range.index : 0;
    quill.insertEmbed(position, "image", gif, title); 
    quill.setSelection(position + 1);
    setValues({...values, media: gif, mediaAlt: title});
    //dispatch(updateQuery(null));
    setGifstMenuOpen(false);
  }