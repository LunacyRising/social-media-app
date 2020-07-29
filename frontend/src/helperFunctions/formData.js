import { removeHtmlTag } from "./removeHtmlTag";

export const formData = (obj) => {
    const data = new FormData();
    for ( let key in obj ) {
      console.log("key", key)
      console.log("values", obj[key])
      let objData = typeof obj[key] !== "number" ? removeHtmlTag(obj[key]) : obj[key];
      data.append(key, objData);
    }
    return data
}