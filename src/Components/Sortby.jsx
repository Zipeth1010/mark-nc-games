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
    <section className=" fixed pt-32 pl-8 text-white">
      <h4 className=" text-2xl font-bold">Sort by:</h4>
      <section className=" grid-cols-1 text-left">
        <div>
          <button
            className="ReviewCardButton"
            onClick={() => setSortby("created_at")}
          >
            Date
          </button>
        </div>
        <div>
          <button
            className="ReviewCardButton"
            onClick={() => setSortby("comment_count")}
          >
            Comment Count
          </button>
        </div>
        <div>
          <button
            className="ReviewCardButton"
            onClick={() => setSortby("votes")}
          >
            Votes
          </button>
        </div>
        <div>
          <button className=" pt-10" onClick={() => setSortOrder("ASC")}>
            Ascending
          </button>
        </div>

        <button className="DESCbutton" onClick={() => setSortOrder("DESC")}>
          Descending
        </button>
      </section>
    </section>
  );
};

export default Sortby;
