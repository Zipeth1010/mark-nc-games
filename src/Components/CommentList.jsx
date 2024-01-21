import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CommentCard from "./CommentCard";
import { getCommentsById } from "../api";
import * as api from "../api";

const CommentList = ({ review_id, loggedUser }) => {
  const [commentList, setCommentList] = useState([]);
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
      username: loggedUser,
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
    <section className=" flex flex-col justify-center items-center text-center text-white">
      <h3 className=" text-2xl font-bold underline py-4">Comments:</h3>
      {successfulPost ? (
        <p>Thank you for commenting!</p>
      ) : (
        <section type="CommentForm">
          <h4 className=" text-xl py-2">Post your own comment:</h4>
          <section>
            <form onSubmit={handleSubmit}>
              <label htmlFor="body">Comment:</label>
              <br></br>
              <textarea
                id="body"
                value={commentBody}
                cols="28"
                className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={(event) => {
                  setCommentBody(event.target.value);
                }}
                required
              />
              <br></br>
              <button
                type="submit"
                disabled={isLoading}
                className=" bg-white text-orange hover:bg-orange hover:text-white py-2 px-4 border border-black rounded"
              >
                Submit!
              </button>
            </form>
          </section>
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
