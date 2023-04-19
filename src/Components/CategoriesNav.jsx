import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

const CategoriesNav = ({ setCategoryList, categoryList }) => {
  useEffect(() => {
    getCategories().then((allCategories) => {
      setCategoryList(allCategories);
    });
  }, [setCategoryList]);

  return (
    <nav>
      <h3>Category List!</h3>
      <ul className="CategoryNav">
        {categoryList.map((category) => {
          return (
            <li key={category.slug}>
              <Link to={`/reviews?category=${category.slug}`}>
                {category.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriesNav;
