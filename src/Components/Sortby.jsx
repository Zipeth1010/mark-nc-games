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
    <section className=" flex md:fixed md:pt-48 md:pl-5 text-white justify-center items-center text-center">
      <section className=" flex-col md:pl-16 items-center justify-center">
        <h4 className=" text-2xl font-bold py-3"> Sort by:</h4>
        <div>
          <button
            className=" bg-white text-orange hover:bg-orange hover:text-white my-1 px-4 rounded"
            onClick={() => setSortby("created_at")}
          >
            Date
          </button>
        </div>
        <div>
          <button
            className=" bg-white text-orange hover:bg-orange hover:text-white my-1 px-4 rounded"
            onClick={() => setSortby("comment_count")}
          >
            Comment Count
          </button>
        </div>
        <div>
          <button
            className=" bg-white text-orange hover:bg-orange hover:text-white my-1 px-4 rounded"
            onClick={() => setSortby("votes")}
          >
            Votes
          </button>
        </div>
        <div>
          <button
            className=" bg-green text-white hover:bg-black hover:text-white my-1 px-4 rounded mt-10"
            onClick={() => setSortOrder("ASC")}
          >
            Ascending
          </button>
        </div>

        <button
          className=" bg-red text-white hover:bg-black hover:text-white my-1 px-4 rounded"
          onClick={() => setSortOrder("DESC")}
        >
          Descending
        </button>
      </section>
    </section>
  );
};

export default Sortby;
