import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewById } from "../api";
import CommentList from "./CommentList";
import * as api from "../api.js";

const FullReviewCard = () => {
  const [displayReview, setDisplayReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [reviewVotes, setReviewVotes] = useState(0);
  const [error, setError] = useState(false);
  const { review_id } = useParams();

  const addVote = (event) => {
    event.preventDefault();
    setHasClicked(true);
    setError(false);
    setReviewVotes((currentVotes) => {
      return currentVotes + 1;
    });
    api.patchVotes(review_id).catch((err) => {
      setHasClicked(false);
      setReviewVotes((currentVotes) => {
        return currentVotes - 1;
      });
      setError(true);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
      setReviewVotes(review.votes);
      setDisplayReview(review);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="FullReviewSection">
      <div className="FullReviewCard">
        <h3>{displayReview.title}</h3>
        <img src={displayReview.review_img_url} alt=""></img>
        <h4>Review Owner: {displayReview.owner}</h4>
        <p>{displayReview.review_body}</p>
        <p>Likes: {reviewVotes}</p>
        <p>Comments: {displayReview.comment_count}</p>
        <button onClick={addVote} disabled={hasClicked}>
          Like!
        </button>
        {error ? (
          <p className="error">There was an error. Try again another time!</p>
        ) : null}
      </div>
      <section>
        <CommentList review_id={review_id} />
      </section>
    </section>
  );
};

export default FullReviewCard;
