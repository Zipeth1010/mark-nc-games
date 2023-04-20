import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getReviewsQuery } from "../api";

const Sortby = ({ reviewList, setReviewList }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderAscending, setOrderAscending] = useState(true);
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const setSortOrder = (direction) => {
    if (direction === "DESC") {
      setOrderAscending(false);
    }
    if (direction === "ASC") {
      setOrderAscending(true);
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSortby = (query) => {
    const newQuery = new URLSearchParams(searchParams);
    newQuery.set("sort_by", query);
    setSearchParams(newQuery);
  };

  useEffect(() => {
    getReviewsQuery(sortByQuery, orderQuery).then((sortedList) => {
      setReviewList(sortedList);
    });
  }, [sortByQuery, orderQuery]);

  return (
    <section className="SortbySection">
      <h3>Sort by:</h3>
      <button
        className="ReviewCardButton"
        onClick={() => setSortby("created_at")}
      >
        Date
      </button>
      <button
        className="ReviewCardButton"
        onClick={() => setSortby("comment_count")}
      >
        Comment Count
      </button>
      <button className="ReviewCardButton" onClick={() => setSortby("votes")}>
        Votes
      </button>
      {orderAscending ? (
        <button className="ASCbutton" onClick={() => setSortOrder("DESC")}>
          Ascending
        </button>
      ) : (
        <button className="DESCbutton" onClick={() => setSortOrder("ASC")}>
          Descending
        </button>
      )}
    </section>
  );
};

export default Sortby;
