

 export const itemExists2 = (items, id, key) => {
    return  items.some(item => item[key] === id)
  } 