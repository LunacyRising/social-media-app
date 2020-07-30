import React from "react";
import Comment from "./Comment";

const Comments = ({ comments, commentsCount, postId, replies }) => { 

  return (
    <>
      {comments.filter(comment =>(comment.postId === postId))
      .map(comment => (
        <Comment key={comment._id} postId={postId} commentsCount={commentsCount} comment={comment.text} media={comment.media} mediaAlt={comment.mediaAlt} avatar={comment.avatar} userName={comment.userName} likes={comment.likes} dislikes={comment.dislikes} createdAt={comment.createdAt} repliesCounter={comment.replies} id={comment._id} comments={comments} replies={replies}/>
      ))
      }
    </>
  );
};

export default React.memo(Comments)
