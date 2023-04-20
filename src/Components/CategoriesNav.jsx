import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

const CategoriesNav = ({ setCategoryList, categoryList }) => {
  useEffect(() => {
    getCategories().then((allCategories) => {
      setCategoryList(allCategories);
    });
  }, [setCategoryList]);

  return (
    <section className="NavBar">
      <h3>Category List!</h3>
      <section className="CategoryNav">
        {categoryList.map((category) => {
          return (
            <button key={category.slug} className="NavButton">
              <Link to={`/reviews?category=${category.slug}`}>
                {category.slug}
              </Link>
            </button>
          );
        })}
      </section>
    </section>
  );
};

export default CategoriesNav;
