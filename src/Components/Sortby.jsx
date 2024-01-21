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
    <section className=" flex text-white justify-center items-center text-center">
      <div className=" max-w-sm mx-auto">
        <section className=" flex-col items-center justify-center">
          <h4 className=" text-2xl font-bold py-3"> Sort by:</h4>

          <button
            className=" bg-white text-orange hover:bg-orange hover:text-white my-2 px-4 border border-black rounded"
            onClick={() => setSortby("created_at")}
          >
            Date
          </button>

          <div>
            <button
              className="  bg-white text-orange hover:bg-orange hover:text-white my-2 px-4 border border-black rounded"
              onClick={() => setSortby("comment_count")}
            >
              Comment Count
            </button>
          </div>
          <div>
            <button
              className="  bg-white text-orange hover:bg-orange hover:text-white my-2 px-4 border border-black rounded"
              onClick={() => setSortby("votes")}
            >
              Votes
            </button>
          </div>
          <div>
            <button
              className=" bg-green text-white hover:bg-black hover:text-white my-1 px-4 rounded mt-10 border border-black"
              onClick={() => setSortOrder("ASC")}
            >
              Ascending
            </button>
          </div>

          <button
            className=" bg-red text-white hover:bg-black hover:text-white my-1 px-4 rounded border border-black"
            onClick={() => setSortOrder("DESC")}
          >
            Descending
          </button>
        </section>
      </div>
    </section>
  );
};

export default Sortby;
