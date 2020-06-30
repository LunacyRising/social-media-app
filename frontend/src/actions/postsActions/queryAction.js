import { QUERY_FORM } from "../types";


export const handleQuery = ({ skip, trimQuery, amounOfPosts }) => {

    const cleanPosts = []

    console.log(trimQuery)

    return {
      type: QUERY_FORM,
      payload: {
        skip,
        query: trimQuery,
        amounOfPosts,
        cleanPosts
      }
    };
  };
  
  