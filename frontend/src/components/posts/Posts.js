import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = ({ posts }) => {

  const { userId, avatar } = useSelector(state => state.authReducer);
  return (
    <>  
        {posts.map(post => (
          <Post
            key={post._id}
            postId={post._id} 
            userId={post.userId}  
            creatorUserName={post.userName}
            creatorAmountOfPosts={post.creatorAmountOfPosts}
            title={post.title} 
            post={post.post}
            avatar={userId === post.userId ? avatar : post.avatar} 
            date={post.date}
            amountOfComments={post.amountOfComments}
            likes={post.likes}
            dislikes={post.dislikes}
            userIsOnline={post.userIsOnline}
          />
        ))}
    </>
  );
};

export default Posts;
