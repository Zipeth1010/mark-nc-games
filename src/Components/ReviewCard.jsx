import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const ReviewCard = (review) => {
  function convertDate(date) {
    let dateArray = date.split("T");
    return `${dateArray[0]} at ${dateArray[1].slice(0, -5)}`;
  }

  return (
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
    </Container>
  );
};

export default ReviewCard;
