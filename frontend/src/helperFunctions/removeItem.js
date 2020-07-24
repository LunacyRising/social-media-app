export const removeItem = (items, id, key) => {
    return items.filter(item => item[key] !== id)  
};