import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CommentCard from "./CommentCard";
import { getCommentsById } from "../api";

const CommentList = ({ review_id }) => {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getCommentsById(review_id).then((comments) => {
      setCommentList(comments);
    });
  });

  return (
    <section>
      <h3>Comments:</h3>
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
