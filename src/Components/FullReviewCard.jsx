import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewById } from "../api";
import CommentList from "./CommentList";
import * as api from "../api.js";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import Loading from "./Loading";

const FullReviewCard = ({ loggedUser }) => {
  const [displayReview, setDisplayReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewVotes, setReviewVotes] = useState(0);
  const [error, setError] = useState(false);
  const { review_id } = useParams();
  const [hasLiked, setHasLiked] = useState(false);

  const addVote = (event) => {
    event.preventDefault();

    setError(false);
    setHasLiked(true);
    setReviewVotes((currentVotes) => {
      return currentVotes + 1;
    });
    api.patchVotesNeg(review_id).catch((err) => {
      setHasLiked(false);
      setReviewVotes((currentVotes) => {
        return currentVotes - 1;
      });
      setError(true);
    });
  };

  const subtractVote = (event) => {
    event.preventDefault();
    setError(false);
    setHasLiked(false);
    setReviewVotes((currentVotes) => {
      return currentVotes - 1;
    });
    api.patchVotes(review_id).catch((err) => {
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
    return <Loading />;
  }
  return (
    <section className=" flex flex-col pt-36 items-center justify-center">
      <section
        href="#"
        class="flex flex-col align-middle items-center bg-white border border-gray-200 rounded-lg shadow xl:flex-row w-[90%] md:w-[75%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-auto md:rounded-none md:rounded-l-lg"
          src={displayReview.review_img_url}
          alt=""
        />
        <div class="flex flex-col justify-center text-center items-center p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {displayReview.title}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Review Owner: {displayReview.owner}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {displayReview.review_body}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
            Likes: {reviewVotes}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
            Comments: {displayReview.comment_count}
          </p>
          {hasLiked ? (
            <button onClick={subtractVote}>
              <svg className=" animate-bounce w-6 h-6">
                <FcLike />
              </svg>
            </button>
          ) : (
            <button onClick={addVote} className=" w-12">
              <FcLikePlaceholder className=" w-12" />
            </button>
          )}

          {error ? (
            <p className="error">There was an error. Try again another time!</p>
          ) : null}
        </div>
      </section>
      <CommentList review_id={review_id} loggedUser={loggedUser} />
    </section>
  );
};

export default FullReviewCard;
