import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CommentCard from "./CommentCard";
import { getCommentsById } from "../api";
import * as api from "../api";

const CommentList = ({ review_id, loggedUser }) => {
  const [commentList, setCommentList] = useState([]);
  const [commentUsername, setCommentUsername] = useState("tickle122");
  const [commentBody, setCommentBody] = useState("");
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  useEffect(() => {
    getCommentsById(review_id).then((comments) => {
      setCommentList(comments);
    });
  }, [setCommentList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentToSubmit = {
      username: commentUsername,
      body: commentBody,
    };
    setIsLoading(true);
    api.postComment(commentToSubmit, review_id).then((postedComment) => {
      setCommentList((commentList) => {
        if (commentList.length === 0) {
          return [postedComment];
        }
        return [postedComment, ...commentList];
      });
      setSuccessfulPost(true);
      setIsLoading(false);
    });
  };

  return (
    <section>
      <h3>Comments:</h3>
      {successfulPost ? (
        <p>Thank you for commenting!</p>
      ) : (
        <section type="CommentForm">
          <h4>Post your own comment:</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">State your username:</label>
            <br></br>
            <input
              id="username"
              value={commentUsername}
              onChange={(event) => {
                setCommentUsername(event.target.value);
              }}
              required
            />
            <br></br>
            <label htmlFor="body">Comment:</label>
            <br></br>
            <textarea
              id="body"
              value={commentBody}
              cols="28"
              onChange={(event) => {
                setCommentBody(event.target.value);
              }}
              required
            />
            <br></br>
            <button type="submit" disabled={isLoading}>
              Submit!
            </button>
          </form>
        </section>
      )}
      {deleteNotification ? <p>Comment Deleted!</p> : null}
      <Grid
        className="CommentGrid"
        container
        columns={3}
        direction="row"
        alignContent="center"
        columnSpacing={[1]}
      >
        {commentList.map((comment) => {
          return (
            <Grid item xs={12} key={comment.comment_id}>
              <CommentCard
                {...comment}
                loggedUser={loggedUser}
                setCommentList={setCommentList}
                review_id={review_id}
                setDeleteNotification={setDeleteNotification}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default CommentList;
