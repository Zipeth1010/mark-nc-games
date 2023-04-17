import { Container } from "@mui/system";

const ReviewCard = (review) => {
  return (
    <Container maxWidth="xs" className="review-list">
      <img src={review.review_img_url} alt=""></img>
      <h4 className="Header4">{review.title}</h4>
      <h5 className="Header5">Review by: {review.owner}</h5>
      <p>Votes: {review.votes}</p>
      <p>Comment Count: {review.comment_count}</p>
    </Container>
  );
};

export default ReviewCard;
