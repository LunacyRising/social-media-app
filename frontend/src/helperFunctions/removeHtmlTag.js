
export const removeHtmlTag = (text) => {
    console.log("text", text)
    let noHtmlTag
    const regex = /(<([^>]+)>)/ig;
    noHtmlTag = text.replace(regex, '');
    return noHtmlTag
}
