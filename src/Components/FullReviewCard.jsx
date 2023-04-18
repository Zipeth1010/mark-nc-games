import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewById } from "../api";
import CommentList from "./CommentList";

const FullReviewCard = () => {
  const [displayReview, setDisplayReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((review) => {
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
        <p>Votes: {displayReview.votes}</p>
        <p>Comments: {displayReview.comment_count}</p>
      </div>
      <section>
        <CommentList review_id={review_id} />
      </section>
    </section>
  );
};

export default FullReviewCard;
