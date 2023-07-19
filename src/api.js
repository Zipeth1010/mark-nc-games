import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://mark-portfolio-project.onrender.com/api",
});

export const getReviews = (category, sortby, order) => {
  return reviewsApi
    .get(`/reviews`, {
      params: { category: category, sort_by: sortby, order: order },
    })
    .then(({ data }) => {
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

export const patchVotes = (review_id) => {
  return reviewsApi
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.updatedReview;
    });
};

export const postComment = (comment, review_id) => {
  return reviewsApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then(({ data }) => {
      return data.comment;
    });
};

export const getCategories = () => {
  return reviewsApi.get("/categories").then(({ data }) => {
    return data.categories;
  });
};

export const getUserApi = (username) => {
  return reviewsApi.get(`/users`).then(({ data }) => {
    return data.users;
  });
};

export const deleteComment = (comment_id) => {
  return reviewsApi.delete(`/comments/${comment_id}`);
};

export const postUser = (user) => {
  return reviewsApi.post(`/users`, user);
};

export const postReview = (review) => {
  return reviewsApi.post(`/reviews`, review);
};
