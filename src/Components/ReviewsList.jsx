import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "react-router-dom";
import Sortby from "./Sortby";

const ReviewsList = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getReviews(category, sortByQuery, orderQuery).then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [category, sortByQuery, orderQuery]);

  return isLoading ? (
    <p>Loading Reviews...</p>
  ) : (
    <section className="ReviewListSection">
      <h3>List of Reviews!</h3>
      <Sortby
        reviewList={reviewList}
        setReviewList={setReviewList}
        category={category}
      />
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
