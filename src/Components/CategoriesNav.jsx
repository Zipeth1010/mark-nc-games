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
    <section className="NavBar">
      <h3>Category List!</h3>
      <select
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
      <button>
        <Link to={`/reviews?category=${searchCategory}`}>Search!</Link>
      </button>
    </section>
  );
};

export default CategoriesNav;
