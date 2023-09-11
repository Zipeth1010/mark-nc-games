import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "react-router-dom";
import Sortby from "./Sortby";
import { getCategories } from "../api";
import * as api from "../api";

const ReviewsList = ({ loggedUser }) => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //to reveal the show form
  const [showForm, setShowform] = useState(false);

  //for the review form
  const [title, setTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [chosenCategory, setChosenCategory] = useState([]);
  const [reviewBody, setReviewBody] = useState("");
  const [designer, setDesigner] = useState("");
  const [reviewImage, setReviewImage] = useState("");

  //list display criterea
  const category = searchParams.get("category");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    getCategories().then((allCategories) => {
      setSelectCategory(allCategories);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getReviews(category, sortByQuery, orderQuery).then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [category, sortByQuery, orderQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    const review = {
      owner: loggedUser,
      title: title,
      review_body: reviewBody,
      designer: designer,
      category: chosenCategory,
      review_img_url: reviewImage,
    };
    setIsLoading(true);
    api
      .postReview(review)
      .then((postedReview) => {
        setReviewList((reviewList) => {
          if (reviewList.length === 1) {
            return [postedReview.data.review];
          }
          return [postedReview.data.review, ...reviewList];
        });
        setIsLoading(false);
        setIsSuccess(true);
        setShowform(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return isLoading ? (
    <p>Loading Reviews...</p>
  ) : (
    <section className=" pt-32 text-white">
      {showForm ? (
        <section className=" flex-col pl-96 text-center">
          <h3>List of Reviews!</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Review title: </label>
            <input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            ></input>
            <br />
            <label htmlFor="selectCategory">Game category: </label>
            <select
              className="Categoryselect"
              onChange={(e) => {
                if (e.target.value === "Select your category") {
                  setChosenCategory(e.target.value);
                } else {
                  const cat = selectCategory?.find(
                    (x) => x.slug === e.target.value
                  );
                  setChosenCategory(cat.slug);
                }
              }}
              required
            >
              <option>Select your category</option>
              {selectCategory.map((category) => {
                return (
                  <option value={category.slug} key={category.slug}>
                    {category.slug}
                  </option>
                );
              })}
            </select>
            <br />
            <label htmlFor="designer">Designer: </label>
            <input
              id="designer"
              placeholder="Designer"
              value={designer}
              onChange={(e) => {
                setDesigner(e.target.value);
              }}
              required
            ></input>
            <br />
            <label htmlFor="reviewimg">Game image: </label>
            <input
              id="reviewimg"
              placeholder="Image of the Game"
              value={reviewImage}
              onChange={(e) => {
                setReviewImage(e.target.value);
              }}
              required
            ></input>
            <br />
            <label htmlFor="reviewbody">Review: </label>
            <textarea
              id="reviewbody"
              placeholder="Review Text"
              value={reviewBody}
              onChange={(e) => {
                setReviewBody(e.target.value);
              }}
              required
            ></textarea>
            <br />
            <button type="submit" onClick={handleSubmit} disabled={isLoading}>
              Submit review!
            </button>
          </form>
        </section>
      ) : (
        <section className=" pl-96 text-center">
          <h3>List of Reviews!</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowform(true);
            }}
            disabled={isSuccess}
          >
            Post a Review!
          </button>
        </section>
      )}
      {isError ? (
        <p>There was an error with your submission, please try again!</p>
      ) : null}
      {isSuccess ? <h5>Thanks a lot for your review!</h5> : null}

      <Sortby
        reviewList={reviewList}
        setReviewList={setReviewList}
        category={category}
      />
      <div className=" pl-80 ">
        <Grid
          container
          justifyContent="center"
          direction="row"
          alignContent="center"
          columnSpacing={[1]}
          zeroMinWidth
        >
          {reviewList.map((review) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={review.review_id}
                className=" pt-5"
              >
                <ReviewCard {...review} loggedUser={loggedUser} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default ReviewsList;
