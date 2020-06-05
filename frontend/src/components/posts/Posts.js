import React from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

const Posts = () => {

  const { userId, avatar } = useSelector(state => state.authReducer);

  const { posts } = useSelector(state => state.postReducer); 
  console.log(posts)

  return (
    <>  
        {posts && posts.map( post => (
          <PostCard
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
