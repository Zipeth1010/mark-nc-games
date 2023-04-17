import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://mark-portfolio-project.onrender.com/api",
});

export const getReviews = () => {
  return reviewsApi.get(`/reviews`).then(({ data }) => {
    return data.reviews;
  });
};
