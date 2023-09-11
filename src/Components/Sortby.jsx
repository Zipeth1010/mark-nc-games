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
    <section className=" fixed pt-32 pl-5 text-center">
      <h4 className=" text-2xl font-bold">Sort by:</h4>
      <section className=" grid grid-cols-1">
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

        <button className=" pt-10" onClick={() => setSortOrder("ASC")}>
          Ascending
        </button>

        <button className="DESCbutton" onClick={() => setSortOrder("DESC")}>
          Descending
        </button>
      </section>
    </section>
  );
};

export default Sortby;
