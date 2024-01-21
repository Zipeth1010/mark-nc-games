import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

const CategoriesNav = ({ setCategoryList, categoryList }) => {
  const [searchCategory, setSearchCategory] = useState([]);
  useEffect(() => {
    getCategories().then((allCategories) => {
      setCategoryList(allCategories);
    });
  }, [setCategoryList]);

  return (
    <section className=" flex flex-col text-white justify-center items-center md:z-50">
      <h2 className=" text-3xl font-bold">Filter/Sort Reviews!</h2>
      <div className=" flex flex-col max-w-sm mx-auto">
        <h3 className=" text-2xl font-bold pt-3">Category Filter:</h3>

        <select
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(e) => {
            if (e.target.value === "All categories") {
              setSearchCategory([]);
            } else {
              const cat = categoryList?.find((x) => x.slug === e.target.value);
              setSearchCategory(cat.slug);
            }
          }}
        >
          <option value="All categories" key={`All categories`}>
            All categories
          </option>
          {categoryList.map((category) => {
            return (
              <option value={category.slug} key={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>
        <button className="  bg-white text-orange hover:bg-orange hover:text-white my-2 px-4 border border-black rounded">
          <Link to={`/reviews?category=${searchCategory}`}>Search!</Link>
        </button>
      </div>
      <br />
    </section>
  );
};

export default CategoriesNav;
