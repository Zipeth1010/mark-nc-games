import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const ReviewCard = (review) => {
  // const viewReview (event) => {

  // }

  return (
    <Container maxWidth="xs" className="review-list">
      <img src={review.review_img_url} alt=""></img>
      <h4 className="Header4">{review.title}</h4>
      <h5 className="Header5">Review by: {review.owner}</h5>
      <p>Votes: {review.votes}</p>
      <p>Comment Count: {review.comment_count}</p>
      <Link to={`/reviews/${review.review_id}`}>
        <button type="button">More Info</button>
      </Link>
    </Container>
  );
};

export default ReviewCard;
