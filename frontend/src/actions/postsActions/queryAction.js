import { QUERY_FORM } from "../types";


export const handleQuery = (skip, query, amounOfPosts) => {

    const cleanPosts = []
    
    return {
      type: QUERY_FORM,
      payload: {
        skip,
        query,
        amounOfPosts,
        cleanPosts
      }
    };
  };
  
  