 // cambiar el valor de userIsOnline del usuario cuando loguea o desloguea, tambien cuando el usuario cambiar de avatar
 export const editKeyValue = (items, id, key, keyValue, keyValue2) => {
    let test = keyValue2 ?  keyValue2 : keyValue 
    return items.map(item => item[key] === id ? {...item, ...test} : item) 
  }
  