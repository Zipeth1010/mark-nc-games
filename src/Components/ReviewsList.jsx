import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "react-router-dom";

const ReviewsList = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    console.log(category);
    getReviews(category).then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [category]);

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
