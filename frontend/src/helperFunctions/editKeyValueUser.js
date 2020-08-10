   // cambiar el valor de userIsOnline del usuario cuando loguea o desloguea, tambien cuando el usuario cambiar de avatar
   export const editKeyValueUser = (items, id, keyValue) => {
    return items.map(item => item.userId === id ? {...item, ...keyValue}: item) 
 }
