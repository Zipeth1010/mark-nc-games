import { Container } from "@mui/system";
import { useState } from "react";
import * as api from "../api";

const CommentCard = (
  comment,
  { loggedUser, setCommentList, review_id, setDeleteNotification }
) => {
  const [error, setError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = (comment_id) => {
    setHasClicked(true);
    setError(false);
    api
      .deleteComment(comment_id)
      .catch((err) => {
        setError(true);
        setHasClicked(false);
      })
      .then(() => {
        api.getCommentsById(comment.review_id).then((comments) => {
          comment.setCommentList(comments);
          comment.setDeleteNotification(true);
        });
      });
  };

  return (
    <Container maxWidth="xs" className="comment-list">
      <h4 className="Header4">Comment by: {comment.author}</h4>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      {comment.loggedUser === comment.author ? (
        <button
          onClick={() => {
            handleClick(comment.comment_id);
          }}
          disabled={hasClicked}
        >
          Delete Comment!
        </button>
      ) : null}
      {error ? <p>Something went wrong, try again another time!</p> : null}
    </Container>
  );
};

export default CommentCard;
