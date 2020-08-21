

export const addEmoji = (event, emojiObject, quillRef) => {
    const quill = quillRef.current.getEditor();
    quill.focus();
    let range = quill.getSelection();
    let position = range ? range.index : 0;
    console.log(quill.insertEmbed);
    quill.insertEmbed(position, "text", emojiObject.emoji); 
    quill.setSelection(position + 2);
};