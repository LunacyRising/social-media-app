import React from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";
import useInfiniteScroll from "./useInfiniteScroll"; 
import SortPosts from "./SortPosts";
import dots from "../../utils/images/dots.svg";

const Posts = ( { quillRef }) => {

  const useStyles = makeStyles(() => ({

    postsContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "100%"
    },
    loader: {
      width: "50%",
      margin: "auto"
    }
  }));
  const classes = useStyles();

  const { postsContainer, loader } = classes;

  const { userId, avatar } = useSelector(state => state.authReducer);

  const { postsLoading, postsLoading2, posts, maxResults, skip } = useSelector(state => state.postReducer); 
  
  const maxResultsNotReached = maxResults > skip;   

  const { lastElement } = useInfiniteScroll( fetchPosts, maxResultsNotReached, postsLoading ); 

  return (
    <>  
        <section className={postsContainer}>
          {posts.length > 0 && <SortPosts/>}
          {postsLoading2 ? <img className={loader} src={dots} alt="dots"/> : posts.map( (post, index) => (
            <article key={post._id} ref={ posts.length === index + 1 ? lastElement : null}>
              <PostCard
                key={post._id} 
                postId={post._id} 
                userId={post.userId}  
                creatorUserName={post.userName}
                creatorAmountOfPosts={post.creatorAmountOfPosts}
                title={post.title} 
                post={post.post}
                media={post.media}
                mediaAlt={post.mediaAlt}
                avatar={userId === post.userId ? avatar : post.avatar} 
                date={post.date}
                amountOfComments={post.amountOfComments} 
                likes={post.likes}
                dislikes={post.dislikes}
                userIsOnline={post.userIsOnline}
                quillRef={quillRef}
              />
            </article> 
          ))}
        </section>
    </>
  );
};

export default Posts;
