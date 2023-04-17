import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";

const ReviewsList = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviewList(reviews);
    });
  }, []);

  return (
    <section>
      <h2>List of Reviews!</h2>
      <Grid
        className="ReviewGrid"
        container
        columns={3}
        direction="row"
        alignContent="center"
        columnSpacing={[-15]}
      >
        {reviewList.map((review) => {
          return (
            <Grid item xs="auto" key={review.review_id}>
              <ReviewCard {...review} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default ReviewsList;
