import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://mark-portfolio-project.onrender.com/api",
});

export const getReviews = () => {
  return reviewsApi.get(`/reviews`).then(({ data }) => {
    return data.reviews;
  });
};

export const getReviewById = (review_id) => {
  return reviewsApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsById = (review_id) => {
  return reviewsApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
