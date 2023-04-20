import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sortby = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSortby = (query) => {
    const newQuery = new URLSearchParams(searchParams);
    newQuery.set("sort_by", query);
    setSearchParams(newQuery);
  };

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

      <button className="ASCbutton" onClick={() => setSortOrder("ASC")}>
        Ascending
      </button>

      <button className="DESCbutton" onClick={() => setSortOrder("DESC")}>
        Descending
      </button>
    </section>
  );
};

export default Sortby;
