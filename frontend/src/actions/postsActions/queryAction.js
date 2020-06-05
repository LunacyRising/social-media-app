import { QUERY_FORM } from "../types";


export const handleQuery = ({skip, query, amounOfPosts}) => {
    return {
      type: QUERY_FORM,
      payload: {
        skip,
        query,
        amounOfPosts
      }
    };
  };
  
  