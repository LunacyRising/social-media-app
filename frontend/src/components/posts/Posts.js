import React from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";
import useInfiniteScroll from "./useInfiniteScroll"; 
import SortPosts from "./SortPosts";

const Posts = () => {

  const { userId, avatar } = useSelector(state => state.authReducer);

  const { postsLoading, posts, maxResults, skip } = useSelector(state => state.postReducer); 
  
  const maxResultsNotReached = maxResults > skip;   

  const { lastElement } = useInfiniteScroll( fetchPosts, maxResultsNotReached, postsLoading ); 

  return (
    <>  
        <div style={{position: "relative"}}>
          {posts.length > 0 && <SortPosts/>}
          {posts && posts.map( (post, index) => (
            <div key={post._id} ref={ posts.length === index + 1 ? lastElement : null}>
            <PostCard
              key={post._id} 
              postId={post._id} 
              userId={post.userId}  
              creatorUserName={post.userName}
              creatorAmountOfPosts={post.creatorAmountOfPosts}
              title={post.title} 
              post={post.post}
              image={post.image}
              gif={post.gif}
              avatar={userId === post.userId ? avatar : post.avatar} 
              date={post.date}
              amountOfComments={post.amountOfComments} 
              likes={post.likes}
              dislikes={post.dislikes}
              userIsOnline={post.userIsOnline}
            />
            </div> 
          ))}
        </div>
    </>
  );
};

export default Posts;
