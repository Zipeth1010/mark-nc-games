import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CommentCard from "./CommentCard";
import { getCommentsById } from "../api";
import * as api from "../api";

const CommentList = ({ review_id }) => {
  const [commentList, setCommentList] = useState([]);
  const [commentUsername, setCommentUsername] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [successfulPost, setSuccessfulPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCommentsById(review_id).then((comments) => {
      setCommentList(comments);
    });
  });

  const commentToSubmit = {
    username: commentUsername,
    body: commentBody,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    api.postComment(commentToSubmit, review_id).then(() => {
      setSuccessfulPost(true);
      setIsLoading(false);
    });
  };

  return (
    <section>
      <h3>Comments:</h3>
      <section type="CommentForm">
        <h4>Post your own comment:</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">State your username:</label>
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
          <input
            id="body"
            value={commentBody}
            onChange={(event) => {
              setCommentBody(event.target.value);
            }}
            required
          />
          <button type="submit" disabled={isLoading}>
            Submit!
          </button>
        </form>
      </section>
      {successfulPost ? <p>Thank you for commenting!</p> : null}
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
            <Grid item xs="auto" key={comment.comment_id}>
              <CommentCard {...comment} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default CommentList;
