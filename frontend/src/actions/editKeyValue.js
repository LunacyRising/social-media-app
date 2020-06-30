   // cambiar el valor de userIsOnline del usuario cuando loguea o desloguea, tambien cuando el usuario cambiar de avatar
    export const editKeyValueUser = (items, id, keyValue) => {
       return items.map(item => item.userId === id ? {...item, ...keyValue}: item) 
    }
    
    // para posts y comentarios
    export const editKeyValue2 = (items, id, keyValue, keyValue2) => {
       let test = keyValue2 ?  keyValue2 : keyValue 
       console.log(test)
      return items.map(item => item._id  === id ? {...item, ...test}: item) 
   }



