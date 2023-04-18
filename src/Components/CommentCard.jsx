import { Container } from "@mui/system";

const CommentCard = (comment) => {
  return (
    <Container maxWidth="xs" className="comment-list">
      <h4 className="Header4">Comment by: {comment.author}</h4>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </Container>
  );
};

export default CommentCard;
