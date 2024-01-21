import { Container } from "@mui/system";
import { useState } from "react";
import * as api from "../api";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const CommentCard = (
  comment,
  { loggedUser, setCommentList, review_id, setDeleteNotification }
) => {
  const comment_id = comment.comment_id;
  const [error, setError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentVotes, setCommentVotes] = useState(comment.votes);

  const addCommentVote = (event) => {
    event.preventDefault();
    setHasClicked(true);
    setError(false);
    setHasLiked(true);
    setCommentVotes((currentVotes) => {
      return currentVotes + 1;
    });
    api.patchCommentVotes(comment_id).catch((err) => {
      setHasClicked(false);
      setHasLiked(false);
      setCommentVotes((currentVotes) => {
        return currentVotes - 1;
      });
      setError(true);
    });
  };

  const subtractCommentVote = (event) => {
    event.preventDefault();
    setHasClicked(true);
    setError(false);
    setHasLiked(false);
    setCommentVotes((currentVotes) => {
      return currentVotes - 1;
    });
    api.patchCommentVotesNeg(comment_id).catch((err) => {
      setHasClicked(false);

      setCommentVotes((currentVotes) => {
        return currentVotes - 1;
      });
      setError(true);
    });
  };

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
    <Container
      maxWidth="xs"
      className=" py-4 border border-black bg-white text-black rounded-md my-2"
    >
      <h4 className=" text-xl font-bold">{comment.author}</h4>
      <p>{comment.body}</p>
      <p className=" text-lg font-bold mb-2">
        <i>Likes:</i> {commentVotes}
      </p>
      <section className="">
        {hasLiked ? (
          <button onClick={subtractCommentVote} className="">
            <svg className=" animate-bounce w-6 h-6">
              <FcLike />
            </svg>
          </button>
        ) : (
          <button onClick={addCommentVote} className=" w-12">
            <FcLikePlaceholder className=" w-12" />
          </button>
        )}
        {comment.loggedUser === comment.author ? (
          <button
            className=" bg-red text-white hover:bg-white hover:text-red my-2 px-4 rounded ml-12"
            onClick={() => {
              handleClick(comment.comment_id);
            }}
            disabled={hasClicked}
          >
            X
          </button>
        ) : null}
      </section>
      {error ? <p>Something went wrong, try again another time!</p> : null}
    </Container>
  );
};

export default CommentCard;
