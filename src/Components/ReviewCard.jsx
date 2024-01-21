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
    <section className=" text-left">
      {displayReview ? (
        <Container
          maxWidth="xs"
          className="hover:scale-105 ease-in-out duration-300 hover:z-10"
        >
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/reviews/${review.review_id}`}>
              <img
                className="rounded-t-lg"
                src={review.review_img_url}
                alt=""
              />
            </Link>
            <div className="p-5">
              <Link to={`/reviews/${review.review_id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {review.title}
                </h5>
              </Link>
              <section className=" grid grid-cols-2">
                <p className=" mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>
                    <i>{review.owner}</i>
                  </b>
                </p>

                <p className=" top-0 right-0 mb-3 text-right">
                  <i>Likes: </i> {review.votes}
                </p>

                <p className=" mb-3">
                  <i>Category: </i>
                  {review.category}
                </p>

                <p className=" mb-3 text-right">
                  <i>Comments: </i>

                  {review.comment_count}
                </p>
              </section>
              <p className=" justify-center">
                <i>Date: </i>
                {convertDate(review.created_at)}
              </p>
              <section className=" flow-root pt-6">
                <Link
                  to={`/reviews/${review.review_id}`}
                  className=" float-left items-center text-sm font-bold text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  ></svg>
                </Link>
                {review.loggedUser === review.owner ? (
                  <button
                    className=" float-right font-bold text-orange mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplaybuttons(true);
                    }}
                  >
                    Delete Review
                  </button>
                ) : null}
                {displaybuttons ? (
                  <section className=" grid mt-20 text-center">
                    <p className=" font-bold text-orange">
                      Are you sure you want to delete this review?
                    </p>
                    <br />
                    <button onClick={deleteReview} className>
                      Yes
                    </button>
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
              </section>
            </div>
          </div>
        </Container>
      ) : (
        <p>Review Deleted!</p>
      )}
    </section>
  );
};

export default ReviewCard;
