import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";

const ReviewsList = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <p>Loading Reviews...</p>
  ) : (
    <section>
      <h2>List of Reviews!</h2>
      <Grid
        className="ReviewGrid"
        container
        columns={3}
        direction="row"
        alignContent="center"
        columnSpacing={[1]}
      >
        {reviewList.map((review) => {
          return (
            <Grid item xs={12} key={review.review_id}>
              <ReviewCard {...review} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default ReviewsList;
