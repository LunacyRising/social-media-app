import { removeHtmlTag } from "./removeHtmlTag";

export const formData = (obj) => {
    const data = new FormData();
    for ( let key in obj ) {
      console.log("key", key)
      console.log("values", obj[key])
      data.append(key, removeHtmlTag(obj[key]));
    }
    return data
}