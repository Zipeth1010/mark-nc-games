import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

const ReviewCard = (review, { loggedUser }) => {
  const [displayReview, setDisplayReview] = useState(true);
  const [isError, setIsError] = useState(false);

  // For the conversion of date to a aesthetic format
  function convertDate(date) {
    let dateArray = date.split("T");
    return `${dateArray[0]} at ${dateArray[1].slice(0, -5)}`;
  }

  // Function to call api to delete the review
  function deleteReview() {
    setIsError(false);
    api
      .deleteReview(review.review_id)
      .then(() => {
        setDisplayReview(false);
      })
      .catch((err) => {});
    setIsError(true);
  }

  // Logic behind the displaying of the deleting buttons
  const [displaybuttons, setDisplaybuttons] = useState(false);

  return (
    <section>
      {displayReview ? (
        <Container maxWidth="xs" className="review-list">
          <img src={review.review_img_url} alt=""></img>
          <h4 className="Header4">{review.title}</h4>
          <h5 className="Header5">Review by: {review.owner}</h5>
          <p>Category: {review.category}</p>
          <p>Votes: {review.votes}</p>
          <p>Comment Count: {review.comment_count}</p>
          <p>Date Created: {convertDate(review.created_at)}</p>
          <Link to={`/reviews/${review.review_id}`}>
            <button type="button" className="ReviewCardButton">
              More Info
            </button>
          </Link>
          {review.loggedUser === review.owner ? (
            <button
              className="deleteButton"
              onClick={(e) => {
                e.preventDefault();
                setDisplaybuttons(true);
              }}
            >
              Delete Review
            </button>
          ) : null}
          {displaybuttons ? (
            <section>
              <p>Are you sure you want to delete this review?</p>
              <br />
              <button onClick={deleteReview}>Yes</button>
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDisplaybuttons(false);
                }}
              >
                No
              </button>
              {isError ? <p>Something went wrong, try again!</p> : null}
            </section>
          ) : null}
        </Container>
      ) : (
        <p>Comment Deleted!</p>
      )}
    </section>
  );
};

export default ReviewCard;
