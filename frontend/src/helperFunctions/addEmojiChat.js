
export const addEmojiChat = (event, emojiObject, quillRef, setValues) => {
    const emoticon = emojiObject.emoji
    setValues(prev => ({  
        ...prev, 
        chatMessage:  prev.chatMessage + emoticon 
    }));
};