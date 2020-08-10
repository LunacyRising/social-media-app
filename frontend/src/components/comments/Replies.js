import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Replies = ({ postId, commentId}) => {  


  const { replies } = useSelector(state => state.commentsReducer);

  return (
    <>  
      {replies && replies.filter(reply => reply.commentId === commentId)
      .map(reply => (
        <Comment replyComponent replies={replies} key={reply._id} id={reply._id} postId={postId}  comment={reply.comment} avatar={reply.avatar} userName={reply.userName} likes={reply.likes} dislikes={reply.dislikes} createdAt={reply.createdAt}/>
      ))
      }
    </> 
    )
};

export default React.memo(Replies);
