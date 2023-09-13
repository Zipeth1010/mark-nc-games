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
    <section className=" fixed flex-col text-white pl-8">
      <h2 className=" text-3xl font-bold">Filter/Sort Reviews!</h2>
      <h3 className=" text-2xl font-bold pt-4">Category Filter:</h3>
      <select
        className=" text-orange mt-2"
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
      <button className=" pl-5">
        <Link to={`/reviews?category=${searchCategory}`}>Search!</Link>
      </button>

      <br />
    </section>
  );
};

export default CategoriesNav;
